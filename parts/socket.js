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

module.exports = (io) => {
  io.on("connection", (socket) => {
    // join a game,
    socket.on("join_game", ({ room_id }) => {
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

      consoleSpacing(` USER CONNECTED  @ ${new Date().toISOString()}`);
      console.log(rooms);
      socket.emit("config_data", config);
    });

    socket.on("roll_dice", ({ gameId }) => {
      console.log("roll dice on server");
      // const face = Math.ceil(Math.random() * 6);
      const face = 6;

      // socket.emit("dice_rolled", { face });
      io.in(gameId).emit("dice_rolled", {
        face,
      });

      const pieceOut = piecesOut(rooms.get(gameId).players.get(socket.id).pos);

      if (pieceOut === 0 && face !== 6) {
        console.log("No Piece Out and not a Six, switching player", face);
        changeCurrentPlayer(socket, io)({ game_id: gameId });
      } else if (pieceOut === 1) {
        console.log("Single Piece Out, Auto Moving", face);
        autoMovePlayerPiece(socket, io)({ gameId, face });
      }
    });

    socket.on("auto_move", autoMovePlayerPiece(socket, io));

    socket.on("change", changeCurrentPlayer(socket, io));

    socket.on("move_piece", ({ dice, position, gameId, index, pieceId }) => {
      const userId = socket.id;
      const color = rooms.get(gameId).players.get(userId).color;
      // no piece out,
      const pieceOut = piecesOut(rooms.get(gameId).players.get(socket.id).pos);
      const new_pos = newPos(dice, position);

      if (pieceOut === 0 && dice === 6) {
        // -> update arr

        rooms.get(gameId).players.get(userId).pos = newArr(
          new_pos,
          rooms.get(gameId).players.get(userId).pos,
          index
        );

        // -> emit moved_piece
        consoleSpacing(
          JSON.stringify({
            posArr: rooms.get(gameId).players.get(userId).pos,
            color,
            new_pos,
            index,
            pieceId,
          })
        );

        // socket.emit("piece_moved", {
        //   posArr: rooms.get(gameId).players.get(userId).pos,
        //   color,
        //   new_pos,
        //   pieceId,
        // });

        // dice is not 6 -> auto switch player
      } else {
        // is piece out
        // -> update arr

        rooms.get(gameId).players.get(userId).pos = newArr(
          new_pos,
          rooms.get(gameId).players.get(userId).pos,
          index
        );
        // -> emit moved_piece
        consoleSpacing(
          JSON.stringify({
            posArr: rooms.get(gameId).players.get(userId).pos,
            color,
            new_pos,
            index,
            pieceId,
          })
        );

        // socket.emit("piece_moved", {
        //   posArr: rooms.get(gameId).players.get(userId).pos,
        //   color,
        //   new_pos,
        //   index,
        //   pieceId,
        // });
      }

      io.in(gameId).emit("piece_moved", {
        posArr: rooms.get(gameId).players.get(userId).pos,
        color,
        new_pos,
        index,
        pieceId,
      });

      setTimeout(
        () => changeCurrentPlayer(socket, io)({ game_id: gameId }),
        100
      );
    });

    socket.on("reset_piece", () => {
      // if (!isSafe(newPos(dice, position)) && !safe_cell) {
      //   // not ( safe or start or final ) cell type -> reset other piece present -> emit reset_piece
      //   socket.emit("reset_piece", {});
      // }
    });

    socket.on("disconnect", () => {
      if (rooms.size !== 0) {
        // consoleSpacing("inside condition");
        for (const [rid, room] of rooms) {
          // consoleSpacing(`searching for room ${JSON.stringify(room.players)}`);
          if (room.players.has(socket.id)) {
            // consoleSpacing("found and deleting");
            consoleSpacing(` USER DISCONNECTED @ ${new Date().toISOString()}`);
            console.log(rooms.get(rid).players.get(socket.id));
            rooms.get(rid).players.delete(socket.id);
          }
        }
      }
    });
  });
};

function autoMovePlayerPiece(socket, io) {
  return ({ gameId, face }) => {
    const pieces_out = piecesOut(rooms.get(gameId).players.get(socket.id).pos);
    const userId = socket.id;
    const color = rooms.get(gameId).players.get(userId).color;

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
      const name = rooms.get(gameId).players.get(userId).color[0] + (index + 1);

      rooms.get(gameId).players.get(userId).pos = newArr(
        new_pos,
        rooms.get(gameId).players.get(userId).pos,
        index
      );

      // -> emit moved_piece
      console.log("Automatic Movement", {
        color,
        new_pos,
        index,
      });

      // socket.emit("piece_moved", {
      //   posArr: rooms.get(gameId).players.get(userId).pos,
      //   new_pos,
      //   pieceID: name,
      // });
      io.in(gameId).emit("auto_move_resp", {
        color,
        new_pos,
        index,
      });
    }
  };
}

function changeCurrentPlayer(socket, io) {
  return ({ game_id }) => {
    consoleSpacing(`CHANGING PLAYER from ${rooms.get(game_id).current}`);
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
    consoleSpacing(rooms.get(game_id).current);

    // socket.emit("update_current", rooms.get(game_id).current);
    io.in(game_id).emit("update_current", {
      current: rooms.get(game_id).current,
    });
  };
}
