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
  newPos,
  noPieceOut,
  hasRoom,
  piecesOut,
} = require("./constant");
var i = 0;

module.exports = (io) => {
  io.on("connection", (socket) => {
    // consoleSpacing();

    // join a game,
    socket.on("join_game", (room_id) => {
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

        config.id = empty.id;
        config.user.id = socket.id;
        config.user.color = empty.color;
        config.current = rooms.get(empty.id).current;
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

      consoleSpacing();
      socket.emit("config_data", config);
    });

    socket.on("roll_dice", ({ gameId, userColor }) => {
      const face = Math.ceil(Math.random() * 6);
      const pieceOut = noPieceOut(rooms.get(gameId).players.get(socket.id).pos);
      socket.emit("dice_rolled", {
        face,
        noPieceOut: pieceOut,
      });
      io.to(gameId).emit("dice_rolled", {
        face,
        noPieceOut: pieceOut,
      });
    });

    socket.on("auto_move", ({ gameId, face }) => {
      const pieces_out = piecesOut(
        rooms.get(gameId).players.get(socket.id).pos
      );

      if (pieces_out === 1) {
        // auto move
        let position = 0;
        let index = 0;
        const userId = socket.id;

        rooms
          .get(gameId)
          .players.get(userId)
          .pos.forEach((i, e) => {
            if (!isNaN(i) && i < 57 && i >= 1) {
              index = e;
              position = i;
            }
          });

        const new_pos = newPos(face, position);
        const name =
          rooms.get(gameId).players.get(userId).color[0] + (index + 1);

        rooms.get(gameId).players.get(userId).pos = newArr(
          new_pos,
          rooms.get(gameId).players.get(userId).pos,
          index
        );

        // -> emit moved_piece
        socket.emit("piece_moved", {
          posArr: rooms.get(gameId).players.get(userId).pos,
          new_pos,
          pieceID: name,
        });
        console.log("Automatic Movement", {
          posArr: rooms.get(gameId).players.get(userId).pos,
          new_pos,
          pieceID: name,
        });
        io.to(gameId).emit("piece_moved", {
          posArr: rooms.get(gameId).players.get(userId).pos,
          new_pos,
          pieceID: name,
        });
      }
    });

    socket.on("change", ({ game_id }) => {
      const currentColor = rooms.get(game_id).players.get(socket.id).color;
      let availableColors = [],
        nextColor;

      rooms.get(game_id).players.forEach((player, id, map) => {
        availableColors.push(player.color);
      });

      switch (availableColors.length) {
        case 1:
          nextColor = currentColor;
          break;
        case 2:
          nextColor =
            currentColor === availableColors[0]
              ? availableColors[1]
              : availableColors[0];
          break;
        case 3:
          nextColor =
            currentColor === availableColors[0]
              ? availableColors[1]
              : currentColor === availableColors[1]
              ? availableColors[2]
              : availableColors[0];
          break;
        case 4:
          nextColor =
            currentColor === availableColors[0]
              ? availableColors[1]
              : currentColor === availableColors[1]
              ? availableColors[2]
              : currentColor === availableColors[2]
              ? availableColors[3]
              : availableColors[0];
          break;
      }

      rooms.get(game_id).current = nextColor;
      console.log(rooms.get(game_id).current, ++i);

      socket.emit("update_current", rooms.get(game_id).current);
      io.to(game_id).emit("update_current", rooms.get(game_id).current);
    });

    socket.on(
      "move_piece",
      ({ name, dice, position, gameId, safe_cell, index }) => {
        const userId = socket.id;
        // no piece out,
        if (noPieceOut(rooms.get(gameId).players.get(userId).pos)) {
          if (dice === 6) {
            // -> update arr
            const new_pos = newPos(dice, position);

            rooms.get(gameId).players.get(userId).pos = newArr(
              new_pos,
              rooms.get(gameId).players.get(userId).pos,
              index
            );

            // -> emit moved_piece
            socket.emit("piece_moved", {
              posArr: rooms.get(gameId).players.get(userId).pos,
              new_pos,
              pieceID: name,
            });
            io.to(gameId).emit("piece_moved", {
              posArr: rooms.get(gameId).players.get(userId).pos,
              new_pos,
              pieceID: name,
            });
          }
          // dice is not 6 -> auto switch player
        } else {
          // is piece out
          // -> update arr
          const new_pos = newPos(dice, position);

          rooms.get(gameId).players.get(userId).pos = newArr(
            new_pos,
            rooms.get(gameId).players.get(userId).pos,
            index
          );
          // -> emit moved_piece
          socket.emit("piece_moved", {
            posArr: rooms.get(gameId).players.get(userId).pos,
            new_pos,
            pieceID: name,
          });
          io.to(gameId).emit("piece_moved", {
            posArr: rooms.get(gameId).players.get(userId).pos,
            new_pos,
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
