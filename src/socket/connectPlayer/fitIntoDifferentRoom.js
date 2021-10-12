const {
  consoleSpacing,
  redPlayer,
  greenPlayer,
  yellowPlayer,
  bluePlayer,
} = require("../../constant");
const { client, db, FieldValue } = require("../../..");

async function fitIntoDifferentRoom(
  roomId,
  idsHaveSpace,
  room,
  userId,
  socket,
  config,
  error
) {
  consoleSpacing("FITTING INTO EMPTY ROOM");
  roomId = Object.keys(idsHaveSpace)[0];
  // room_data has empty rooms.
  let player,
    color = idsHaveSpace[Object.keys(idsHaveSpace)[0]].pop();

  await db
    .collection("idsHaveSpace")
    .doc(Object.keys(idsHaveSpace)[0])
    .update("colors", FieldValue.arrayRemove(color));

  switch (color) {
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

  room = JSON.parse(await client.get(roomId));

  console.log(room);

  room.players[userId] = Object.assign({}, player);

  await client.set(roomId, ".", JSON.stringify(room), "XX");

  socket.leave(userId);
  socket.join(roomId);

  consoleSpacing("-");
  console.log(room.players);
  consoleSpacing("-");

  config.id = roomId;
  config.current = room.current;
  config.user.id = userId;
  config.user.color = room.players[userId].color;

  if (idsHaveSpace[Object.keys(idsHaveSpace)[0]].length === 0) {
    await db
      .collection("idsHaveSpace")
      .doc(Object.keys(idsHaveSpace)[0])
      .delete();
  }

  return { roomId, room, config, error };
}

exports.fitIntoDifferentRoom = fitIntoDifferentRoom;
