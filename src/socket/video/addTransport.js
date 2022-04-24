const { client } = require("../../..");

const addTransport = async (transport, room, userId, consumer) => {
  room.players[userId].transports.push({
    transport,
    consumer,
  });

  return room;
};

exports.addTransport = addTransport;
