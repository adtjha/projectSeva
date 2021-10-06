const { v4: uuidv4 } = require("uuid");
const { guid } = require("../guid");
const { consoleSpacing, rooms, hasEmpty, redPlayer, greenPlayer, yellowPlayer, bluePlayer, generateFEN } = require("../constant");

/**
 *  Chance
 *  each player gets a chance,
 *  player plays the chance, either roll | roll + move | chance + 1
 *
 */
function connectPlayer(socket, io) {
  return ({ room_id }) => {
    // if room empty -> fit user in room array -> send room id
    let config = { id: "", user: { id: "", color: "" } };
    const empty = hasEmpty({ id: "", state: "", color: "" }, room_id);

    if (empty.state) {
      let player;
      switch (empty.color) {
        case "red":
          player = { ...redPlayer };
          break;
        case "green":
          player = { ...greenPlayer };
          break;
        case "yellow":
          player = { ...yellowPlayer };
          break;
        case "blue":
          player = { ...bluePlayer };
          break;
      }
      rooms.get(empty.id).players.set(socket.id, { ...player });

      socket.leave(socket.id);
      socket.join(empty.id);

      consoleSpacing("-");
      console.log(rooms.get(empty.id).players);
      consoleSpacing("-");

      config.id = empty.id;
      config.user.id = socket.id;
      config.user.color = empty.color;
      config.current = rooms.get(empty.id).current;
    } else {
      // create a room of 4
      let room = {
        players: new Map(),
        current: "",
        dice: 1,
      };
      // const room_id = uuidv4();
      const room_id = guid();
      room.current = "red";

      // -> Push into room into rooms array
      rooms.set(room_id, { ...room });
      rooms.get(room_id).players.set(socket.id, { ...redPlayer });

      socket.leave(socket.id);
      socket.join(room_id);

      // -> send room id
      config.id = room_id;
      config.user.id = socket.id;
      config.user.color = "red";
      config.current = "red";
    }

    // consoleSpacing(` USER CONNECTED  @ ${new Date().toISOString()}`);
    console.log(rooms);
    socket.emit("config_data", {
      data: config,
      dice: rooms.get(config.id).dice,
      fen: generateFEN(rooms.get(config.id).players),
    });
    io.to(config.id).emit("config_data", {
      data: "",
      dice: "",
      fen: generateFEN(rooms.get(config.id).players),
    });
  };
}
exports.connectPlayer = connectPlayer;
