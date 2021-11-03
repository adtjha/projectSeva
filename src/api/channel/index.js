const express = require("express");
const channel = express.Router();

const { db } = require("../../../index");
const guid = require("../../guid");
const { verifyContents } = require("../helper");

// const process = require("process");
// require("dotenv").config();

// var admin = require("firebase-admin");

// var serviceAccount = JSON.parse(process.env.GOOGLE_CRED);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const db = admin.firestore();

channel.use(express.json());

channel.get("/test", (req, res) => {
  res.json({
    result: true,
    data: new Date().toLocaleString(),
  });
});

channel.post("/", (req, res) => {
  const channel = req.body;
  var verified = false;
  verifyContents({ channel })
    .then(() => {
      console.log("Resolved");
      verified = true;
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: `Missing/Incorrect Data : ${err}`,
        error_code: 102,
        data: {},
      });
    });

  console.log(db);

  verified &&
    db
      .collection("channel")
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

channel.get("/", (req, res) => {
  const id = req.body;

  console.log(db);

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

channel.patch("/", (req, res) => {
  res.send("UPDATING CHANNEL DATA...");
});

channel.delete("/", (req, res) => {
  res.send("DELETING CHANNEL...");
});

module.exports = channel;
