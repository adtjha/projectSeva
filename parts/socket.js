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
  piecesOut,
  otherPLayerPosArray,
  isSafe,
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
      const face = Math.ceil(Math.random() * 6);
      // const face = 6;

      // socket.emit("dice_rolled", { face });
      io.in(gameId).emit("dice_rolled", {
        face,
      });

      const pieceOut = piecesOut(rooms.get(gameId).players.get(socket.id).pos);

      if (pieceOut === 0 && face !== 6) {
        console.log("No Piece Out and not a Six, switching player", face);
        setTimeout(
          () => changeCurrentPlayer(socket, io)({ game_id: gameId }),
          1700
        );
      } else if (pieceOut === 1) {
        console.log("Single Piece Out, Auto Moving", face);
        setTimeout(
          () => autoMovePlayerPiece(socket, io)({ gameId, face }),
          1700
        );
      }
    });

    socket.on("auto_move", autoMovePlayerPiece(socket, io));

    socket.on("change", changeCurrentPlayer(socket, io));

    socket.on("move_piece", movePiece(socket, io));

    socket.on("reset_piece", resetPiece(socket, io));

    socket.on("disconnect", () => {
      if (rooms.size !== 0) {
        for (const [rid, room] of rooms) {
          if (room.players.has(socket.id)) {
            consoleSpacing(` USER DISCONNECTED @ ${new Date().toISOString()}`);
            console.log(rooms.get(rid).players.get(socket.id));
            rooms.get(rid).players.delete(socket.id);
          }
        }
      }
    });
  });
};

function resetPiece(socket, io) {
  return ({ new_pos, gameId }) => {
    consoleSpacing("IN RESETING PIECE");
    const userId = socket.id;
    const color = rooms.get(gameId).players.get(userId).color;
    // get other player pos
    const otherPLayerPos = otherPLayerPosArray(new_pos, color);
    let otherPLayerPresent = {};
    // find other piece,
    if (rooms.get(gameId).players.has(socket.id)) {
      for (const [pid, player] of rooms.get(gameId).players) {
        if (player.color !== color) {
          const playerColor = player.color;
          player.pos.forEach((p, i) => {
            if (p === otherPLayerPosArray[playerColor]) {
              otherPLayerPresent[playerColor].push({
                index: i,
                position: p,
              });
            }
          });
        }
      }
    }
    console.log(isSafe(new_pos));
    if (
      !isSafe(new_pos) &&
      otherPLayerPresent[Object.keys(otherPLayerPresent)[0]]
    ) {
      consoleSpacing();
      console.log(
        otherPLayerPresent,
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]]
      );
      consoleSpacing();

      const playerIndex =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][
          ~~(
            otherPLayerPresent[Object.keys(otherPLayerPresent)[0]].length *
            Math.random()
          )
        ];
      const pos =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex].pos;
      const i =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
          .index;
      const name =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][
          playerIndex
        ].color.split("")[0] + "0";

      movePiece(
        socket,
        io
      )({
        dice: name,
        position: pos,
        gameId,
        index: playerIndex,
        pieceId: name,
      });
    }
  };
}

function movePiece(socket, io) {
  return ({ dice, position, gameId, index, pieceId }) => {
    const userId = socket.id;
    const color = rooms.get(gameId).players.get(userId).color;
    const new_pos = newPos(dice, position);

    // -> update arr
    if (new_pos !== -1) {
      rooms.get(gameId).players.get(userId).pos = newArr(
        new_pos,
        rooms.get(gameId).players.get(userId).pos,
        index
      );

      io.in(gameId).emit("piece_moved", {
        posArr: rooms.get(gameId).players.get(userId).pos,
        color,
        new_pos,
        index,
        pieceId,
      });

      resetPiece(
        socket,
        io
      )({
        new_pos,
        gameId,
      });

      if (dice !== 6) {
        setTimeout(
          () => changeCurrentPlayer(socket, io)({ game_id: gameId }),
          1000
        );
      }
    }
  };
}

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

      const name = rooms.get(gameId).players.get(userId).color[0] + (index + 1);

      // -> emit moved_piece
      console.log("Automatic Movement");

      if (face !== 6) {
        movePiece(
          socket,
          io
        )({
          dice: face,
          position,
          gameId,
          index,
          pieceId: name,
        });
      }
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
