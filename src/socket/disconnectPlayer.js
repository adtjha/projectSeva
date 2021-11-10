const { client, db, FieldValue } = require("../..");
const { rooms } = require("../constant");

function disconnectPlayer(socket) {
  return async () => {
    let playerRoomId, userId;

    db.collection("users")
      .where("socket", "==", socket.id)
      .get()
      .then((query) => {
        const user = query.docs[0];
        playerRoomId = user.data().room;
        userId = user.data().uid;
        user.ref.update({ socket: "" });
      });

    if (playerRoomId) {
      const room = JSON.parse(await client.get(playerRoomId));
      if (room.players.hasOwnProperty(userId)) {
        room.players[userId].socketId = "";
        await client.set(playerRoomId, ".", JSON.stringify(room), "XX");
      }
    }
  };
}
exports.disconnectPlayer = disconnectPlayer;
