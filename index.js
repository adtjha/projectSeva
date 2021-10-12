const express = require("express");
const app = express();
const { Server } = require("socket.io");
const process = require("process");
const path = require("path");

/**
 * REDIS CONFIG
 * redis-11304.c253.us-central1-1.gce.cloud.redislabs.com:11304
 */
const redisModulesSdk = require("redis-modules-sdk");
var redisAuth = require("./Admin/redis.json");
const client = new redisModulesSdk.ReJSON({
  host: "redis-11304.c253.us-central1-1.gce.cloud.redislabs.com",
  port: 11304,
  password: redisAuth.password,
});

(async () => {
  await client.connect();
})();

exports.client = client;

/**
 *  FIRESTORE CONFIG
 */

var admin = require("firebase-admin");
var serviceAccount = require("./Admin/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
exports.db = admin.firestore();
exports.FieldValue = admin.firestore.FieldValue;

const port = process.env.PORT || 8888;

app.use(express.static("frontend/build"));

const server = app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});

const io = new Server(server, { cors: { origin: "*" } });
require("./src/socket")(io, client);

app.get("/", (req, res) => {
  console.log("Hello World!");
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
