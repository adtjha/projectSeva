const { v4: uuidv4 } = require("uuid");

function resetPiece(socket, io) {
  return ({ new_pos, gameId }) => {
    const userId = socket.id;
    const color = rooms.get(gameId).players.get(userId).color;
    // get other player pos
    const otherPLayerPos = otherPLayerPosArray(new_pos, color);
    console.log(color, otherPLayerPos);
    let otherPLayerPresent = {};
    // find other piece,
    if (rooms.get(gameId).players.has(userId)) {
      for (const [pid, player] of rooms.get(gameId).players) {
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

    if (!isSafe(new_pos) &&
      otherPLayerPresent[Object.keys(otherPLayerPresent)[0]]) {
      const playerIndex = ~~(
        otherPLayerPresent[Object.keys(otherPLayerPresent)[0]].length *
        Math.random()
      );
      const pos = otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
        .position;
      const i = otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
        .index;
      const name = Object.keys(otherPLayerPresent)[0].split("")[0] + (i + 1).toString();
      const otherPLayerUserId = otherPLayerPresent[Object.keys(otherPLayerPresent)[0]][playerIndex]
        .userId;

      console.log(pos, playerIndex, i, name, otherPLayerUserId);

      rooms.get(gameId).players.get(otherPLayerUserId).pos = newArr(
        name,
        rooms.get(gameId).players.get(otherPLayerUserId).pos,
        i
      );

      setTimeout(
        () => io.in(gameId).emit("piece_moved", {
          posArr: rooms.get(gameId).players.get(otherPLayerUserId).pos,
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
