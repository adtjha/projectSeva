const { v4: uuidv4 } = require("uuid");
const { io } = require("../index");
const { newArr, isPieceOut } = require("./constant");
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
      let player,
        uid = uuidv4();

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

      rooms[empty.id].players[uid] = { ...player };

      rooms[empty.id].players[uid].socket_id = socket.id;

      socket.join(empty.id);

      config.id = empty.id;
      config.user.id = uid;
      config.user.color = empty.color;
      config.current = rooms[empty.id].current;
    } else {
      // create a room of 4 -> Push into room into rooms array -> send room id
      let room = { ...roomDefault };
      const room_id = uuidv4();
      const player_id = uuidv4();
      room.currentPlayer = "red";

      rooms[room_id] = room;
      rooms[room_id].players[player_id] = { ...redPlayer };

      socket.join(room_id);

      config.id = room_id;
      config.user.id = player_id;
      config.user.color = "red";
      config.current = "red";
    }

    socket.emit("config_data", config);
  });

  socket.on("roll_dice", ({ game_id }) => {
    const face = Math.ceil(Math.random() * 6);
    // socket.emit("dice_rolled", face);
    // socket.broadcast.emit("dice_rolled", face);
    io.to(gameId).emit("dice_rolled", face);
  });

  socket.on("change", ({ game_id }) => {
    const index = players.findIndex((p) => p === rooms[gameId].currentPlayer);
    let newIndex = index === 3 ? 0 : index + 1;

    rooms[gameId].currentPlayer = players[newIndex];

    // socket.emit("update_current", rooms[gameId].currentPlayer);
    // socket.broadcast.emit("update_current", rooms[gameId].currentPlayer);
    io.to(gameId).emit("update_current", rooms[gameId].currentPlayer);
  });

  socket.on("move_piece", ({ toMove, color, name, dice, position, gameId }) => {
    // no piece out,
    if (noPieceOut(rooms[gameId].players[userId].pos)) {
      if (dice === 6) {
        // -> update arr
        rooms[gameId].players[userId].pos = newArr(
          dice,
          position,
          rooms[gameId].players[userId].pos
        );
        // -> emit moved_piece
        io.to(game_id).emit("piece_moved", {
          toMove,
          color,
          pieceID: name,
        });
      } else {
        // dice is not 6 -> emit err
        io.to(game_id).emit("move_error", {
          message: "Cannot move any piece.",
        });
      }
    } else {
      // is piece out
      // -> update arr
      rooms[gameId].players[userId].pos = newArr(
        dice,
        position,
        rooms[gameId].players[userId].pos
      );
      // -> emit moved_piece
      io.to(game_id).emit("moved_piece", {
        toMove,
        color,
        pieceID: name,
      });
    }
  });

  socket.on("reset_piece", () => {
    // if (!isSafe(newPos(dice, position)) && !safe_cell) {
    //   // not ( safe or start or final ) cell type -> reset other piece present -> emit reset_piece
    //   socket.emit("reset_piece", {});
    // }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");

    let toDelete;
    for (const [id, room] of Object.entries(rooms)) {
      for (const [id, player] of Object.entries(room.players)) {
        if (player.socket_id === socket.id) {
          toDelete.player = id;
        }
      }
      toDelete.room = id;
    }

    delete rooms[toDelete.room].players[toDelete.player];
  });
});
