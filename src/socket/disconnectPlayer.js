const { v4: uuidv4 } = require("uuid");
const { rooms } = require("../constant");

function disconnectPlayer(socket) {
  return () => {
    if (rooms.size !== 0) {
      for (const [rid, room] of rooms) {
        if (room.players.has(socket.id)) {
          rooms.get(rid).players.delete(socket.id);
        }
        if (rooms.get(rid).players.size === 0) {
          rooms.delete(rid);
        }
      }
    }
  };
}
exports.disconnectPlayer = disconnectPlayer;
