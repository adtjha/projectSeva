const { generateFEN, roomDefault } = require("../../constant");
const { db } = require("../../..");
const { createNewRoom } = require("./createNewRoom");
const { fitIntoDifferentRoom } = require("./fitIntoDifferentRoom");
const { fitIntoDesiredRoom } = require("./fitIntoDesiredRoom");

/**
 *  Chance
 *  each player gets a chance,
 *  player plays the chance, either roll | roll + move | chance + 1
 *
 */

function connectPlayer(socket, io) {
  return async ({ room_id }) => {
    // if room empty -> fit user in room array -> send room id
    var config = { id: "", current: "", user: { id: "", color: "" } },
      room,
      roomId = room_id,
      userId = socket.id,
      idsHaveSpace = {},
      space,
      error = {};

    if (!roomId) {
      // room id absent
      // Get first empty room
      const snapshot = (await db.collection("idsHaveSpace").limit(1).get())
        .docs;

      if (snapshot.length > 0) {
        console.log(snapshot);
        space = snapshot[0].exists;
        idsHaveSpace = { [snapshot[0].id]: snapshot[0].data()["colors"] };
        console.log(idsHaveSpace, Object.keys(idsHaveSpace)[0]);
      } else {
        space = false;
      }

      if (space) {
        ({ roomId, room, config, error } = await fitIntoDifferentRoom(
          roomId,
          idsHaveSpace,
          room,
          userId,
          socket,
          config,
          error
        ));
      } else {
        ({ roomId, room, config, error } = await createNewRoom(
          roomId,
          room,
          userId,
          socket,
          config,
          error
        ));
      }
    } else {
      ({ room, config, error } = await fitIntoDesiredRoom(
        room,
        roomId,
        userId,
        socket,
        config,
        error
      ));
      // room id is full
    }
    console.log(room);

    if (Object.keys(error).length > 0) {
      socket.emit("error", error);
    } else {
      await db
        .collection("players")
        .doc(userId)
        .set({ room: roomId }, { merge: true });

      socket.emit("config_data", {
        data: config,
        dice: room.dice,
        fen: generateFEN(room.players),
      });
      io.to(config.id).emit("config_data", {
        data: "",
        dice: "",
        fen: generateFEN(room.players),
      });
    }
  };
}

exports.connectPlayer = connectPlayer;
