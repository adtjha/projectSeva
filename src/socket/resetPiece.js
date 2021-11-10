const { client } = require("../..");
const { otherPLayerPosArray, newArr } = require("../constant");

function resetPiece(socket, io) {
  return async ({ new_pos, gameId, userId }) => {
    const room = JSON.parse(await client.get(gameId));
    const color = room.players[userId].color;

    // get other player pos
    const otherPLayerPos = otherPLayerPosArray(new_pos, color);
    console.log(color, otherPLayerPos);
    let otherPLayerPresent = {};

    // find other piece,
    if (room.players.hasOwnProperty(userId)) {
      for (const [pid, player] of Object.entries(room.players)) {
        if (player.color !== color) {
          const playerColor = player.color;
          const playerId = pid;
          player.pos.forEach((p, i) => {
            if (p === otherPLayerPos[playerColor]) {
              otherPLayerPresent[playerColor] = [];
              otherPLayerPresent[playerColor].push({
                index: i,
                position: p,
                userId: playerId,
              });
            }
          });
        }
      }
    }

    if (
      !isSafe(new_pos) &&
      otherPLayerPresent[Object.keys(otherPLayerPresent)[0]]
    ) {
      const playerIndex = ~~(
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]].length *
        Math.random()
      );
      const pos =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
          .position;
      const i =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
          .index;
      const name =
        Object.keys(otherPLayerPresent)[0].split("")[0] + (i + 1).toString();
      const otherPLayerUserId =
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
          .userId;

      console.log(pos, playerIndex, i, name, otherPLayerUserId);

      room.players[otherPLayerUserId].pos = newArr(
        name,
        room.players[otherPLayerUserId].pos,
        i
      );

      await client.set(gameId, ".", JSON.stringify(room), "XX");

      setTimeout(
        () =>
          io.in(gameId).emit("piece_moved", {
            posArr: room.players[otherPLayerUserId].pos,
            color: Object.keys(otherPLayerPresent)[0],
            new_pos: name,
            index: i,
            pieceId: name,
          }),
        500
      );

      return true;
    } else {
      return false;
    }
  };
}

exports.resetPiece = resetPiece;
