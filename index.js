const express = require("express");

const app = express();

// const path = require("path");
const { Server } = require("socket.io");
const process = require("process");

require("dotenv").config();

/**

██████╗░███████╗██████╗░██╗░██████╗
██╔══██╗██╔════╝██╔══██╗██║██╔════╝
██████╔╝█████╗░░██║░░██║██║╚█████╗░
██╔══██╗██╔══╝░░██║░░██║██║░╚═══██╗
██║░░██║███████╗██████╔╝██║██████╔╝
╚═╝░░╚═╝╚══════╝╚═════╝░╚═╝╚═════╝░

░█████╗░░█████╗░███╗░░██╗███████╗██╗░██████╗░
██╔══██╗██╔══██╗████╗░██║██╔════╝██║██╔════╝░
██║░░╚═╝██║░░██║██╔██╗██║█████╗░░██║██║░░██╗░
██║░░██╗██║░░██║██║╚████║██╔══╝░░██║██║░░╚██╗
╚█████╔╝╚█████╔╝██║░╚███║██║░░░░░██║╚██████╔╝
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░░░░╚═╝░╚═════╝░
 */
const redisModulesSdk = require("redis-modules-sdk");
const client = new redisModulesSdk.ReJSON({
  host: "redis-11304.c253.us-central1-1.gce.cloud.redislabs.com",
  port: 11304,
  password: process.env.REDIS_PASSWORD,
});

(async () => {
  await client.connect();
})();

exports.client = client;

/**
███████╗██╗██████╗░███████╗░██████╗████████╗░█████╗░██████╗░███████╗
██╔════╝██║██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝
█████╗░░██║██████╔╝█████╗░░╚█████╗░░░░██║░░░██║░░██║██████╔╝█████╗░░
██╔══╝░░██║██╔══██╗██╔══╝░░░╚═══██╗░░░██║░░░██║░░██║██╔══██╗██╔══╝░░
██║░░░░░██║██║░░██║███████╗██████╔╝░░░██║░░░╚█████╔╝██║░░██║███████╗
╚═╝░░░░░╚═╝╚═╝░░╚═╝╚══════╝╚═════╝░░░░╚═╝░░░░╚════╝░╚═╝░░╚═╝╚══════╝

░█████╗░░█████╗░███╗░░██╗███████╗██╗░██████╗░
██╔══██╗██╔══██╗████╗░██║██╔════╝██║██╔════╝░
██║░░╚═╝██║░░██║██╔██╗██║█████╗░░██║██║░░██╗░
██║░░██╗██║░░██║██║╚████║██╔══╝░░██║██║░░╚██╗
╚█████╔╝╚█████╔╝██║░╚███║██║░░░░░██║╚██████╔╝
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░░░░╚═╝░╚═════╝░
 */

var admin = require("firebase-admin");
var serviceAccount = JSON.parse(process.env.GOOGLE_CRED);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

exports.db = db;
exports.FieldValue = FieldValue;

const port = process.env.PORT || 8888;

app.use(express.static("frontend/build"));

const server = app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});

app.get("/", (req, res) => {
  console.log("Hello World!");
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

/**
░██████╗░█████╗░░█████╗░██╗░░██╗███████╗████████╗  
██╔════╝██╔══██╗██╔══██╗██║░██╔╝██╔════╝╚══██╔══╝  
╚█████╗░██║░░██║██║░░╚═╝█████═╝░█████╗░░░░░██║░░░  
░╚═══██╗██║░░██║██║░░██╗██╔═██╗░██╔══╝░░░░░██║░░░  
██████╔╝╚█████╔╝╚█████╔╝██║░╚██╗███████╗░░░██║░░░  
╚═════╝░░╚════╝░░╚════╝░╚═╝░░╚═╝╚══════╝░░░╚═╝░░░  

░█████╗░░█████╗░███╗░░██╗███████╗██╗░██████╗░
██╔══██╗██╔══██╗████╗░██║██╔════╝██║██╔════╝░
██║░░╚═╝██║░░██║██╔██╗██║█████╗░░██║██║░░██╗░
██║░░██╗██║░░██║██║╚████║██╔══╝░░██║██║░░╚██╗
╚█████╔╝╚█████╔╝██║░╚███║██║░░░░░██║╚██████╔╝
░╚════╝░░╚════╝░╚═╝░░╚══╝╚═╝░░░░░╚═╝░╚═════╝░
*/

const io = new Server(server, { cors: { origin: "*" } });
require("./src/socket")(io);

/**
░█████╗░██╗░░██╗░█████╗░███╗░░██╗███╗░░██╗███████╗██╗░░░░░  ░█████╗░██████╗░██╗██╗░██████╗
██╔══██╗██║░░██║██╔══██╗████╗░██║████╗░██║██╔════╝██║░░░░░  ██╔══██╗██╔══██╗██║╚█║██╔════╝
██║░░╚═╝███████║███████║██╔██╗██║██╔██╗██║█████╗░░██║░░░░░  ███████║██████╔╝██║░╚╝╚█████╗░
██║░░██╗██╔══██║██╔══██║██║╚████║██║╚████║██╔══╝░░██║░░░░░  ██╔══██║██╔═══╝░██║░░░░╚═══██╗
╚█████╔╝██║░░██║██║░░██║██║░╚███║██║░╚███║███████╗███████╗  ██║░░██║██║░░░░░██║░░░██████╔╝
░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚══╝╚══════╝╚══════╝  ╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░╚═════╝░
 */
app.use(express.json());

const {
  getChannel,
  postChannel,
  testChannel,
  deleteChannel,
} = require("./src/api/channel");

app.get("/api/test", testChannel);

app.post("/api/channel", postChannel);

app.get("/api/channel", getChannel);

app.delete("/api/channel", deleteChannel);

/**

██████╗░██████╗░  ░█████╗░██████╗░██╗██╗░██████╗
██╔══██╗██╔══██╗  ██╔══██╗██╔══██╗██║╚█║██╔════╝
██║░░██║██████╦╝  ███████║██████╔╝██║░╚╝╚█████╗░
██║░░██║██╔══██╗  ██╔══██║██╔═══╝░██║░░░░╚═══██╗
██████╔╝██████╦╝  ██║░░██║██║░░░░░██║░░░██████╔╝
╚═════╝░╚═════╝░  ╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░╚═════╝░
 */

app.get("/db", async (req, res) => {
  const channelId = "72nWEeqmyKRtZjyotl4f";
  const snapshot = await db
    .collection("channel")
    .doc(channelId)
    .collection("rooms")
    .where("colors", "array-contains-any", ["red", "green", "yellow", "blue"])
    .orderBy("space", "asc")
    .get();

  snapshot.docs.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
    doc.ref.delete();
  });

  res.json(snapshot.docs);
});

/**
███╗░░░███╗███████╗██████╗░██╗░█████╗░░██████╗░█████╗░██╗░░░██╗██████╗░
████╗░████║██╔════╝██╔══██╗██║██╔══██╗██╔════╝██╔══██╗██║░░░██║██╔══██╗
██╔████╔██║█████╗░░██║░░██║██║███████║╚█████╗░██║░░██║██║░░░██║██████╔╝
██║╚██╔╝██║██╔══╝░░██║░░██║██║██╔══██║░╚═══██╗██║░░██║██║░░░██║██╔═══╝░
██║░╚═╝░██║███████╗██████╔╝██║██║░░██║██████╔╝╚█████╔╝╚██████╔╝██║░░░░░
╚═╝░░░░░╚═╝╚══════╝╚═════╝░╚═╝╚═╝░░╚═╝╚═════╝░░╚════╝░░╚═════╝░╚═╝░░░░░
 */

const { getRtp } = require("./src/api/mediasoup");
const mediasoup = require("mediasoup");
const asyncHandler = require("express-async-handler");

const webRtcrTransport_options = {
  listenIps: [
    {
      ip: "0.0.0.0",
      announcedIp: "127.0.0.1",
    },
  ],
  enableUdp: true,
  enableTcp: true,
  preferUdp: true,
};

global.worker = {};

mediasoup
  .createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2020,
  })
  .then((value) => {
    worker = value;
    console.log(`worker pid ${worker.pid}`);
    worker.on("died", (error) => {
      // This implies something serious happened, so kill the application
      console.error("mediasoup worker has died");
      setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
    });
  });

// app.post(
//   "/mediasoup/getRtp",
//   asyncHandler(async (req, res) => {
//     // console.log("GET RTP : FETCHING ROOM");
//     // const { userId, roomId } = req.body;
//     // let room;

//     // room = JSON.parse(await client.get(roomId));

//     // console.log("FETCHING ROOM DONE...");
//     // console.log(req.body, roomId, room);

//     // if (!(Object.keys(room.router).length > 0)) {
//     //   room.router = await worker.createRouter({ mediaCodecs });
//     //   console.log(`Router ID: ${room.router}`);
//     // }

//     // await client.set(roomId, ".", JSON.stringify(room), "XX");

//     res.send({ ...room.router.rtpCapabilities });
//   })
// );

app.post(
  "/mediasoup/createWebRtcTransport",
  asyncHandler(async (req, res) => {
    const { userId, roomId, sender } = req.body;
    let room, params;

    room = JSON.parse(await client.get(roomId));

    let transport = await room.router.createWebRtcTransport(
      webRtcrTransport_options
    );
    console.log(`transport id: ${transport.id}`);

    transport.on("close", () => {
      console.log("transport closed");
    });

    transport.on("dtlsstatechange", (dtlsState) => {
      if (dtlsState === "closed") {
        transport.close();
      }
    });

    if (sender) {
      room.players[userId].producerTransport = transport;
    } else {
      room.players[userId].consumerTransport = transport;
    }
    params = {
      id: transport.id,
      iceParameters: transport.iceParameters,
      iceCandidates: transport.iceCandidates,
      dtlsParameters: transport.dtlsParameters,
    };
    res.send({ params });

    await client.set(roomId, ".", JSON.stringify(room), "XX");
  })
);

app.post(
  "/mediasoup/transport-connect",
  asyncHandler(async (req, res) => {
    const { dtlsParameters, roomId, userId } = req.body;
    let room;

    room = JSON.parse(await client.get(roomId));

    room.players[userId].producerTransport.connect({ dtlsParameters });
    res.send();

    await client.set(roomId, ".", JSON.stringify(room), "XX");
  })
);

app.post(
  "/mediasoup/transport-produce",
  asyncHandler(async (req, res) => {
    const { kind, rtpParameters, appData, roomId, userId } = req.body();
    let room;

    room = JSON.parse(await client.get(roomId));

    room.players[userId].producer = await room.players[
      userId
    ].producerTransport.produce({
      kind,
      rtpParameters,
    });

    console.log(
      "Producer ID: ",
      room.players[userId].producer.id,
      room.players[userId].producer.kind
    );

    room.players[userId].producer.on("transportclose", () => {
      console.log("transport for this producer closed");
      producer.close();
    });

    res.send({
      id: room.players[userId].producer.id,
    });

    await client.set(roomId, ".", JSON.stringify(room), "XX");
  })
);
