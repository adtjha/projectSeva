const express = require("express");
const app = express();

// const api = require("./src/api");

const { Server } = require("socket.io");
const process = require("process");
// const path = require("path");
require("dotenv").config();

/**
 * REDIS CONFIG
 * redis-11304.c253.us-central1-1.gce.cloud.redislabs.com:11304
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
 *  FIRESTORE CONFIG
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

// app.use(express.static("frontend/build"));

const server = app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});

const io = new Server(server, { cors: { origin: "*" } });
require("./src/socket")(io, client);

app.get("/", (req, res) => {
  console.log("Hello World!");
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

// app.use("/api", api);

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

// app.get("/db", async (req, res) => {
//   const channelId = "MrXQ5AU337YjWyvp1MTW";
//   const snapshot = await db
//     .collection(`channel/${channelId}/rooms`)
//     .orderBy("colors", "asc")
//     .get();

//   snapshot.docs.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//   });

//   res.json(snapshot.docs);
// });
