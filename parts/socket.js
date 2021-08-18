const { v4: uuidv4 } = require("uuid");
const { io } = require("../index");
const {
  consoleSpacing,
  rooms,
  roomDefault,
  hasEmpty,
  players,
} = require("./constants");

io.on("connection", (socket) => {
  console.log("a user connected");
  consoleSpacing();

  // join a game,
  socket.on("join_game", () => {
    // if room empty -> fit user in room array -> send room id
    let config = { id: "", user: { id: "", color: "" } };

    const empty = hasEmpty({ id: "", state: "", color: "" });

    if (empty.state) {
      rooms.forEach((r) => {
        if (r.id === empty.id) {
          r.players.forEach((p) => {
            if (p.color === empty.color) {
              let uid = uuidv4();

              p.id = uid;
              p.socket_id = socket.id;

              socket.join(empty.id);

              config.id = empty.id;
              config.user.id = uid;
              config.user.color = empty.color;
              config.current = empty.current;
            }
          });
        }
      });
    } else {
      // create a room of 4 -> Push into room into rooms array -> send room id
      let room = { ...roomDefault };
      room.id = uuidv4();
      room.players[0].id = uuidv4();
      room.currentPlayer = "red";
      rooms.push(room);

      socket.join(room.id);

      config.id = room.id;
      config.user.id = room.players[0].id;
      config.user.color = "red";
      config.current = "red";
    }

    socket.emit("config_data", config);
    consoleSpacing();
    console.log(JSON.stringify(rooms));
    consoleSpacing();
  });

  socket.on("roll_dice", ({ game_id }) => {
    // const face = Math.ceil(Math.random() * 6);
    const face = 6;
    console.log(socket.rooms, socket.rooms.size);
    socket.emit("dice_rolled", face);
    socket.broadcast.emit("dice_rolled", face);
  });

  socket.on("change", ({ game_id }) => {
    rooms.forEach((r) => {
      if (r.id === game_id) {
        const index = players.findIndex((p) => p === r.currentPlayer);
        let newIndex = index === 3 ? 0 : index + 1;
        
        r.currentPlayer = players[newIndex]
        
        socket.emit("update_current", r.currentPlayer);
        socket.broadcast.emit("update_current", r.currentPlayer);
        console.log("sent", r.currentPlayer);
      }
    });
  });

  socket.on("move_piece", ({ toMove, color, name }) => {
    console.log({ toMove, color, pieceID: name });
    socket.broadcast.emit("piece_moved", {
      toMove,
      color,
      pieceID: name,
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    rooms.forEach((r) => {
      r.players.forEach((p) => {
        if (p.socket_id === socket.id) {
          p.socket_id = "";
          p.id = "";
          p.stream = "";
          socket.leave(r.id);
        }
      });
    });

    consoleSpacing();
    console.log(JSON.stringify(rooms));
    consoleSpacing();
  });
});
