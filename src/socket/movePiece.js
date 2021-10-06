const { v4: uuidv4 } = require("uuid");
const { resetPiece } = require("./resetPiece");
const { changeCurrentPlayer } = require("./changeCurrentPlayer");

function movePiece(socket, io) {
  return ({ dice, position, gameId, index, pieceId }) => {
    const userId = socket.id;

    const color = rooms.get(gameId).players.get(userId).color;
    consoleSpacing("-");
    const new_pos = newPos(dice, position);

    // -> update arr
    if (new_pos !== -1) {
      // updating players array
      rooms.get(gameId).players.get(userId).pos = newArr(
        new_pos,
        rooms.get(gameId).players.get(userId).pos,
        index
      );
      console.log({
        posArr: rooms.get(gameId).players.get(userId).pos,
        color,
        new_pos,
        index,
        pieceId,
      });
      // relay new arrays to users
      io.in(gameId).emit("piece_moved", {
        posArr: rooms.get(gameId).players.get(userId).pos,
        color,
        new_pos,
        index,
        pieceId,
      });

      const winners = [], winnerLength = rooms.get(gameId).players.size - 1;
      rooms.get(gameId).players.forEach((player, pid) => {
        player.pos.every((e) => e === 57) ? winners.push(player.color) : "";
      });

      if (winners.length > 0) {
        io.in(gameId).emit("game_end", {
          end: winners.length === winnerLength,
          winners,
        });
      }

      new Promise((resolve, reject) => {
        resetPiece(
          socket,
          io
        )({
          new_pos,
          gameId,
        })
          ? resolve()
          : reject();
      }).then(
        () => { },
        () => {
          if (dice !== 6) {
            setTimeout(() => {
              changeCurrentPlayer(socket, io)({ game_id: gameId });
            }, 1000);
          }
        }
      );
    }
  };
}
exports.movePiece = movePiece;
