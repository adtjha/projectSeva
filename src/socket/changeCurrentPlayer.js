const { v4: uuidv4 } = require("uuid");

function changeCurrentPlayer(socket, io) {
  return ({ game_id }) => {
    // consoleSpacing(`CHANGING PLAYER from ${rooms.get(game_id).current}`);
    const currentColor = rooms.get(game_id).players.get(socket.id).color;
    let availableColors = [], nextColor;

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
    // consoleSpacing(rooms.get(game_id).current);
    // socket.emit("update_current", rooms.get(game_id).current);
    io.in(game_id).emit("update_current", {
      current: rooms.get(game_id).current
    });
  };
}
exports.changeCurrentPlayer = changeCurrentPlayer;
