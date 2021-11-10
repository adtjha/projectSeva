const { client } = require("../..");
const { rooms } = require("../constant");
const { movePiece } = require("./movePiece");

function autoMovePlayerPiece(socket, io) {
  return async ({ gameId, face, userId }) => {
    const room = JSON.parse(await client.get(gameId));
    const player = room.players[userId];

    // auto move
    let position = 0;
    let index = 0;

    player.pos.forEach((i, e) => {
      if (!isNaN(i) && i < 57 && i >= 1) {
        index = e;
        position = i;
      }
    });

    const name = player.color + (index + 1);

    await client.set(gameId, ".", JSON.stringify(room), "XX");

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
  };
}

exports.autoMovePlayerPiece = autoMovePlayerPiece;
