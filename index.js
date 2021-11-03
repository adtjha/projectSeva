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

app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    result: true,
    data: new Date().toLocaleString(),
  });
});

app.post("/api/channel", (req, res) => {
  const channel = req.body;
  db.collection("channel")
    .add({ ...channel })
    .then((resp) =>
      res.status(200).json({
        success: true,
        message: "Channel created successfully.",
        data: {
          [resp.id]: { ...channel },
        },
      })
    )
    .catch((error) => {
      console.log(`"Rejected 2" : ${error}`);
      res.status(400).json({
        success: false,
        message: `Error creating channel: ${err}`,
        error_code: 101,
        data: {},
      });
    });
});

app.get("/api/channel", (req, res) => {
  const id = req.body.id;

  const snapshot = db.collection("channel").doc(id).get();

  snapshot
    .then((doc) => res.status(200).json({ ...doc.data() }))
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Id : ${err}`,
        error_code: 102,
        data: {},
      })
    );
});

app.delete("/api/channel", (req, res) => {
  const id = req.body.id;

  const snapshot = db.collection("channel").doc(id).delete();

  snapshot
    .then(() =>
      res.status(200).json({
        success: true,
        message: "Channel deleted successfully",
        error_code: 102,
        data: {},
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Id : ${err}`,
        error_code: 102,
        data: {},
      })
    );
});
