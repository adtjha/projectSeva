const { client, db, FieldValue } = require("../..");
const { rooms } = require("../constant");

function disconnectPlayer(socket) {
  return async () => {
    const userId = socket.id;
    let playerRoomId;

    const snapshot = await db.collection("players").doc(userId).get();
    console.log(snapshot.data());

    if (snapshot.exists) {
      playerRoomId = snapshot.data().room;
      const room = JSON.parse(await client.get(playerRoomId));

      if (room.players.hasOwnProperty(userId)) {
        await db
          .collection("idsHaveSpace")
          .doc(playerRoomId)
          .set(
            { colors: FieldValue.arrayUnion(room.players[userId].color) },
            { merge: true }
          );

        await db.collection("players").doc(userId).delete();

        delete room.players[userId];
        if (Object.keys(room.players).length > 0) {
          await client.set(playerRoomId, ".", JSON.stringify(room), "XX");
        } else {
          await client.del(playerRoomId);
        }
      }
    }
  };
}
exports.disconnectPlayer = disconnectPlayer;
