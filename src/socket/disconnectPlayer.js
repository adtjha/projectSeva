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
        // await db
        //   .collection(`channel/${channelId}/rooms`)
        //   .doc(playerRoomId)
        //   .set(
        //     { colors: FieldValue.arrayUnion(room.players[userId].color) },
        //     { merge: true }
        //   );

        room.players[userId].socketId = "";

        // room.gameEnded &&
        //   (await db.collection("players").doc(userId).delete());

        // delete room.players[userId];
        // if (Object.keys(room.players).length > 0) {
        await client.set(playerRoomId, ".", JSON.stringify(room), "XX");
        // } else {
        //   await client.del(playerRoomId);
        // }
      }
    }
  };
}
exports.disconnectPlayer = disconnectPlayer;
