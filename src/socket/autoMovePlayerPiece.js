const { v4: uuidv4 } = require("uuid");
const { movePiece } = require("./movePiece");

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
      // console.log("Automatic Movement");
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
exports.autoMovePlayerPiece = autoMovePlayerPiece;
