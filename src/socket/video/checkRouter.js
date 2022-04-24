const { mediaCodecs } = require("../../constant");
const { createWebRtcTransport } = require("./createWebRtcTransport");

const checkRouter = async (room, userId, transportParams) => {
  if (!room.router.id) {
    room.router = await worker.createRouter({ mediaCodecs });

    const transport = await createWebRtcTransport(room.router);
    console.log(`Transport: ${JSON.stringify(transportParams)}`);

    room.players[userId].transport = { ...transport };
    transportParams = {
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    };
  } else if (room.players[userId].transport === {}) {
    const transport = await createWebRtcTransport(room.router);
    console.log(`Transport: ${JSON.stringify(transportParams)}`);

    room.players[userId].transport = { ...transport };
    transportParams = {
      params: {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      },
    };
  } else {
    console.log("WHY HERE");
    return {
      room,
      transportParams: {
        params: {
          id: room.players[userId].transport.id,
          iceParameters: room.players[userId].transport.iceParameters,
          iceCandidates: room.players[userId].transport.iceCandidates,
          dtlsParameters: room.players[userId].transport.dtlsParameters,
        },
      },
    };
  }

  console.log(`Router ID: ${room.router.id}`);
  return { room, transportParams };
};

exports.checkRouter = checkRouter;
