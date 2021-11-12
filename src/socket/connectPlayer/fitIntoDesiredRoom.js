const {
  consoleSpacing,
  redPlayer,
  greenPlayer,
  yellowPlayer,
  bluePlayer,
} = require("../../constant");
const { client, db } = require("../../..");

async function fitIntoDesiredRoom({
  room,
  roomId,
  userId,
  socket,
  config,
  error,
}) {
  room = JSON.parse(await client.get(roomId));

  // if (!room) {
  //   const roomSnapshot = await db.collection("rooms").doc(roomId).limit(1).get()
  //     .docs[0];
  //   if (roomSnapshot.data()) {
  //     room = { [roomSnapshot.id]: roomSnapshot.data() };
  //   } else {
  //     // ROOM NOT FOUND.
  //     error = {
  //       type: "ROOM NOT CREATED YET",
  //       message:
  //         "Room ID does not exsists, either join another room, or wait for someone to create it.",
  //     };
  //   }
  // }

  if (Object.keys(room.players).find((e) => e == userId)) {
    room.players[userId].socketId = socket.id;

    client
      .set(roomId, ".", JSON.stringify(room), "XX")
      .then(console.log)
      .catch(console.error);

    socket.leave(userId);
    socket.join(roomId);

    config.id = roomId;
    config.current = room.current;
    config.user.id = userId;
    config.user.color = room.players[userId].color;
  } else {
    if (Object.keys(room.players).length < 4) {
      consoleSpacing("ROOM ID PRESENT : FITTING");
      // room id has space
      let playerColors = ["red", "green", "blue", "yellow"];

      Object.values(room.players).forEach((player) => {
        playerColors = playerColors.filter((color) => color !== player.color);
      });

      console.log(playerColors);

      switch (playerColors[0]) {
        case "red":
          player = Object.assign({}, redPlayer);
          break;
        case "green":
          player = Object.assign({}, greenPlayer);
          break;
        case "yellow":
          player = Object.assign({}, yellowPlayer);
          break;
        case "blue":
          player = Object.assign({}, bluePlayer);
          break;
      }

      room.players[userId] = Object.assign({}, player);
      room.players[userId].socketId = socket.id;

      await client.set(roomId, ".", room, "XX");

      socket.leave(userId);
      socket.join(roomId);

      config.id = roomId;
      config.current = room.current;
      config.user.id = userId;
      config.user.color = room.players[userId].color;
    } else {
      consoleSpacing("ROOM ID PRESENT : NO SPACE");
      error = {
        type: "ROOM IS FULL",
        message:
          "Room ID is already full, either join another room, or wait for someone to leave it.",
      };
    }
  }

  return { room, config, error };
}
exports.fitIntoDesiredRoom = fitIntoDesiredRoom;
