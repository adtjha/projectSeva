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
  return async ({ channelId, roomId, userId }, callback) => {
    // if room empty -> fit user in room array -> send room id
    var config = { id: "", current: "", user: { id: "", color: "" } },
      room,
      idsHaveSpace = {},
      space = false,
      error = {};

    const userSnap = await db
      .collection("users")
      .where("uid", "==", userId)
      .get();
    const user = userSnap.docs[0].data();
    roomId = user?.room;
    console.log(roomId);

    if (!roomId && roomId !== undefined) {
      // room id absent
      // Get first empty room
      const snapshot = await db
        .collection("channel")
        .doc(channelId)
        .collection("rooms")
        .where("colors", "array-contains-any", [
          "red",
          "green",
          "yellow",
          "blue",
        ])
        .get();

      if (snapshot.docs.length > 0) {
        console.log(snapshot.docs);
        idsHaveSpace = {
          [snapshot.docs[0].id]: snapshot.docs[0].data()["colors"],
        };
        space = true;
      } else {
        space = false;
      }

      if (space) {
        ({ roomId, room, config, error } = await fitIntoDifferentRoom({
          channelId,
          roomId,
          idsHaveSpace,
          room,
          userId,
          socket,
          config,
          error,
        }));
      } else {
        ({ roomId, room, config, error } = await createNewRoom({
          channelId,
          roomId,
          room,
          userId,
          socket,
          config,
          error,
        }));
      }
    } else {
      ({ room, config, error } = await fitIntoDesiredRoom({
        channelId,
        room,
        roomId,
        userId,
        socket,
        config,
        error,
      }));
      // room id is full
    }
    console.log(room);

    if (Object.keys(error).length > 0) {
      socket.emit("error", error);
    } else {
      console.log(userId);
      db.collection("users")
        .where("uid", "==", userId)
        .get()
        .then((query) => {
          const user = query.docs[0];
          user.ref.set({ room: roomId, socket: socket.id }, { merge: true });
        });

      callback({
        data: config,
        dice: room.dice,
        fen: generateFEN(room.players),
      });

      io.to(roomId).emit("config_data", {
        data: "",
        dice: "",
        fen: generateFEN(room.players),
      });
    }
  };
}

exports.connectPlayer = connectPlayer;

/**
 * Get Empty Room from Channel
 * (await db.collection("idsHaveSpace").where('channelId', '==', channelId).get()).collection('rooms').where('colors', )
 *
 * (await db.collection("idsHaveSpace").where('channelId', '==', channelId).get()).docs
 *
 *
 */
