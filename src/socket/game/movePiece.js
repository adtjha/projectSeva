const { resetPiece } = require("./resetPiece");
const { changeCurrentPlayer } = require("./changeCurrentPlayer");
const { newPos, rooms, consoleSpacing, newArr } = require("../../constant");
const { client } = require("../../..");

function movePiece(socket, io) {
  return async ({ dice, position, gameId, index, pieceId, userId }) => {
    const room = JSON.parse(await client.get(gameId));
    const player = room.players[userId];
    const color = player.color;

    const new_pos = newPos(dice, position);

    if (new_pos !== -1) {
      player.pos = newArr(new_pos, player.pos, index);
      console.log({
        posArr: player.pos,
        color,
        new_pos,
        index,
        pieceId,
      });

      await client.set(gameId, ".", JSON.stringify(room), "XX");

      // relay new arrays to users
      io.in(gameId).emit("piece_moved", {
        posArr: player.pos,
        color,
        new_pos,
        index,
        pieceId,
      });

      const winners = [],
        winnerLength = Object.keys(room.players).length - 1;

      Object.values(room.players).forEach((player) => {
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
          userId,
        })
          ? resolve()
          : reject();
      }).then(
        () => {},
        () => {
          if (dice !== 6) {
            setTimeout(() => {
              changeCurrentPlayer(socket, io)({ game_id: gameId, userId });
            }, 1000);
          }
        }
      );
    }
  };
}
exports.movePiece = movePiece;
