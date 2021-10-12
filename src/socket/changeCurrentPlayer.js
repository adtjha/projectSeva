const { client } = require("../..");
const { rooms } = require("../constant");

function changeCurrentPlayer(socket, io) {
  return async ({ game_id }) => {
    // consoleSpacing(`CHANGING PLAYER from ${rooms.get(game_id).current}`);
    const room = JSON.parse(await client.get(game_id));

    const currentColor = room.players[socket.id].color;
    let availableColors = [],
      nextColor;

    Object.values(room.players).forEach((player) => {
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

    room.current = nextColor;

    await client.set(game_id, ".", JSON.stringify(room), "XX");

    io.in(game_id).emit("update_current", {
      current: room.current,
    });
  };
}

exports.changeCurrentPlayer = changeCurrentPlayer;
