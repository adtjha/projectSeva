const { v4: uuidv4 } = require("uuid");
const {
  consoleSpacing,
  rooms,
  roomDefault,
  hasEmpty,
  players,
  redPlayer,
  greenPlayer,
  yellowPlayer,
  bluePlayer,
  newArr,
  noPieceOut,
} = require("./constant");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    // consoleSpacing();

    // join a game,
    socket.on("join_game", () => {
      // if room empty -> fit user in room array -> send room id
      let config = { id: "", user: { id: "", color: "" } };
      const empty = hasEmpty({ id: "", state: "", color: "" });

      console.log("before empty", rooms);

      if (empty.state) {
        let player;
        console.log("is empty", rooms);
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

        config.id = empty.id;
        config.user.id = socket.id;
        config.user.color = empty.color;
        config.current = rooms.get(empty.id).current;
        console.log("exit is empty", rooms);
      } else {
        // create a room of 4
        let room = {
          players: new Map(),
          current: "",
        };
        const room_id = uuidv4();
        room.current = "red";

        console.log("is not empty", rooms, room, room_id, roomDefault);
        // -> Push into room into rooms array
        rooms.set(room_id, { ...room });
        rooms.get(room_id).players.set(socket.id, { ...redPlayer });
        console.log("exit is not empty", rooms, room, room_id, roomDefault);

        socket.leave(socket.id);
        socket.join(room_id);

        // -> send room id
        config.id = room_id;
        config.user.id = socket.id;
        config.user.color = "red";
        config.current = "red";
      }

      console.log("exit join", rooms);
      consoleSpacing();
      socket.emit("config_data", config);
    });

    socket.on("roll_dice", ({ gameId }) => {
      // const face = Math.ceil(Math.random() * 6);
      const face = 6;
      socket.emit("dice_rolled", face);
      io.to(gameId).emit("dice_rolled", face);
    });

    socket.on("change", ({ game_id }) => {
      const index = players.findIndex((p) => p === rooms.get(game_id).current);
      console.log(rooms.get(game_id).current);

      let newIndex = index === 3 ? 0 : index + 1;

      rooms.get(game_id).current = players[newIndex];
      console.log(rooms.get(game_id).current);

      socket.emit("update_current", rooms.get(game_id).current);
      io.to(game_id).emit("update_current", rooms.get(game_id).current);
    });

    socket.on(
      "move_piece",
      ({ toMove, color, name, dice, position, gameId, userId, safe_cell }) => {
        // no piece out,
        if (noPieceOut(rooms.get(gameId).players.get(userId).pos)) {
          if (dice === 6) {
            // -> update arr
            rooms.get(gameId).players.get(userId).pos = newArr(
              dice,
              position,
              rooms.get(gameId).players.get(userId).pos
            );
            // -> emit moved_piece
            socket.emit("piece_moved", {
              toMove,
              color,
              pieceID: name,
            });
            io.to(gameId).emit("piece_moved", {
              toMove,
              color,
              pieceID: name,
            });
          } else {
            // dice is not 6 -> emit err
            socket.emit("move_error", {
              message: "Cannot move any piece.",
            });
            io.to(gameId).emit("move_error", {
              message: "Cannot move any piece.",
            });
          }
        } else {
          // is piece out
          // -> update arr
          rooms.get(gameId).players.get(userId).pos = newArr(
            dice,
            position,
            rooms.get(gameId).players.get(userId).pos
          );
          // -> emit moved_piece
          socket.emit("piece_moved", {
            toMove,
            color,
            pieceID: name,
          });
          io.to(gameId).emit("piece_moved", {
            toMove,
            color,
            pieceID: name,
          });
        }
      }
    );

    socket.on("reset_piece", () => {
      // if (!isSafe(newPos(dice, position)) && !safe_cell) {
      //   // not ( safe or start or final ) cell type -> reset other piece present -> emit reset_piece
      //   socket.emit("reset_piece", {});
      // }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");

      if (rooms.size !== 0) {
        for (const [rid, room] of rooms) {
          for (const [pid, player] of room.players) {
            if (player.socket_id === socket.id) {
              rooms.get(rid).players.delete(pid);
            }
          }
        }
      }
    });
  });
};
