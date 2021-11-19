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

process.env.DEBUG = "mediasoup*";
const mediasoup = require("mediasoup");

global.worker = {};

mediasoup
  .createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2020,
    logLevel: "debug",
    logTags: ["ice", "dtls"],
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
