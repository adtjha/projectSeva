const { client } = require("../../..");
const { addTransport } = require("./addTransport");
const { createWebRtcTransport } = require("./createWebRtcTransport");

const createSendTransport = (socket, io) => {
  return async ({ consumer, roomId, userId }, callback) => {
    let room = JSON.parse(await client.get(roomId));
    console.log(JSON.stringify(room));
    let router = room.router;

    console.log(Object.keys(room.router));

    createWebRtcTransport(router)
      .then((transport) => {
        callback({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters,
          },
        });

        room = addTransport(transport, room, userId, consumer);
      })
      .catch(console.error);

    await client.set(roomId, ".", JSON.stringify(room), "XX");
  };
};

exports.createSendTransport = createSendTransport;
