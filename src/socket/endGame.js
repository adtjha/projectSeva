const endGame = (socket, io) => {
  return async ({}) => {
    let playerRoomId, userId;
    const userRef = db.collection("users");

    userRef
      .where("socket", "==", socket.id)
      .get()
      .then((query) => {
        const user = query.docs[0];
        playerRoomId = user.data().room;
      });

    if (playerRoomId) {
      const room = JSON.parse(await client.get(playerRoomId));

      if (room.gameEnded) {
        Object.keys(room.players).forEach((uid) => {
          userRef
            .where("uid", "==", uid)
            .get()
            .then((query) => {
              query.docs[0].ref.update({ room: "", socket: "" });
            });
        });

        await db
          .collection("channel")
          .doc(channelId)
          .collection("rooms")
          .doc(playerRoomId)
          .delete();

        await client.del(playerRoomId);
      }
    }
  };
};

exports.endGame = endGame;
