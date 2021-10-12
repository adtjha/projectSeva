const { guid } = require("../../guid");
const { consoleSpacing, redPlayer } = require("../../constant");
const { client, db } = require("../../..");

async function createNewRoom(roomId, room, userId, socket, config, error) {
  consoleSpacing("NEW ROOM CREATION");
  // create room to place socket.
  // create a room of 4
  roomId = guid();

  // -> Push into room into rooms array
  room = {
    players: {},
    current: "",
    dice: 1,
  };

  room.players[userId] = Object.assign({}, redPlayer);
  room.current = "red";

  socket.leave(userId);
  socket.join(roomId);

  await client.set(roomId, ".", JSON.stringify(room), "NX");

  await db
    .collection("idsHaveSpace")
    .doc(roomId)
    .set({ colors: ["green", "yellow", "blue"] });

  // -> send room id
  config.id = roomId;
  config.user.id = userId;
  config.user.color = "red";
  config.current = "red";
  return { roomId, room, config, error };
}
exports.createNewRoom = createNewRoom;
