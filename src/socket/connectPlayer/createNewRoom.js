const { guid } = require("../../guid");
const { consoleSpacing, redPlayer } = require("../../constant");
const { client, db } = require("../../..");

async function createNewRoom({
  channelId,
  roomId,
  room,
  userId,
  socket,
  config,
  error,
}) {
  consoleSpacing("NEW ROOM CREATION");
  // create room to place socket.
  // create a room of 4
  roomId = guid();

  // -> Push into room into rooms array
  room = {
    players: {},
    current: "",
    dice: 1,
    gameEnded: false,
  };

  room.players[userId] = Object.assign({}, redPlayer);
  room.players[userId].socketId = socket.id;
  room.current = "red";

  socket.leave(`${socket.id}`);
  socket.join(roomId);

  await client.set(roomId, ".", JSON.stringify(room), "NX");

  await db
    .collection("channel")
    .doc(channelId)
    .collection("rooms")
    .doc(roomId)
    .set({ colors: ["green", "yellow", "blue"], space: 3 }, { merge: false });

  // -> send room id
  config.id = roomId;
  config.user.id = userId;
  config.user.color = "red";
  config.current = "red";
  return { roomId, room, config, error };
}
exports.createNewRoom = createNewRoom;
