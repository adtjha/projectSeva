const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const webrtc = require("wrtc");
const process = require("process");

const port = 8888;

const consoleSpacing = () => {
  console.log(" ");
  console.log("-----------------------");
  console.log(" ");
};

const rooms = [
  {
    id: "374a8d06-4a2c-45ec-a631-ff2d5730a17c",
    players: [{ red: "" }, { green: "" }, { blue: "" }, { yellow: "" }],
    currentPlayer: "red",
  },
];

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  consoleSpacing();

  // join a game,
  socket.on("join_game", () => {
    // if room empty -> fit user in room array -> send room id
    let empty = { id: "", state: "", color: "" },
      senderStream = "",
      config = { id: "", user: { id: "", color: "" } };

    const handletrack = (e, peer) => {
      console.log("adding tracks");
      senderStream = e.streams[0];
    };

    rooms.every((r) => {
      r.players.every((p) => {
        if (p[Object.keys(p)[0]] === "") {
          empty.state = true;
          empty.color = Object.keys(p)[0];
          return false;
        } else return true;
      });
      if (empty.state) {
        empty.id = r.id;
        empty.current = r.currentPlayer;
        return false;
      } else return true;
    });

    if (empty.state) {
      rooms.forEach((r) => {
        if (r.id === empty.id) {
          r.players.forEach((p) => {
            if (Object.keys(p)[0] === empty.color) {
              let uid = uuidv4();
              p[Object.keys(p)[0]] = uid;
              config.id = empty.id;
              config.user.id = uid;
              config.user.color = empty.color;
              config.current = empty.current;
            }
          });
        }
      });
    } else {
      // create a room of 4 -> Push into room into rooms array -> send room id
      let roomId = uuidv4(),
        playerId = uuidv4();
      rooms.push({
        id: roomId,
        players: [
          { red: playerId },
          { green: "" },
          { blue: "" },
          { yellow: "" },
        ],
        currentPlayer: "red",
      });

      config.id = roomId;
      config.user.id = playerId;
      config.user.color = "red";
      config.current = "red";
    }

    socket.emit("config_data", config);

    socket.on("broadcast", async (body) => {
      console.log("in broadcast");
      const peer = new webrtc.RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.stunprotocol.org",
          },
        ],
      });

      console.log("peer");

      peer.ontrack = (e) => handletrack(e, peer);

      const desc = new webrtc.RTCSessionDescription(body.sdp);

      console.log("set remote description");
      await peer.setRemoteDescription(desc);

      console.log("creating answer");
      const answer = await peer.createAnswer();

      console.log("in setLocalDescription");
      await peer.setLocalDescription(answer);

      console.log("broadcast_res");
      socket.emit("broadcast_res", {
        sdp: peer.localDescription,
      });

      consoleSpacing();
    });

    socket.on("consumer", async (body) => {
      console.log("in consumer");
      const peer = new webrtc.RTCPeerConnection({
        iceServers: [
          {
            urls: "stun:stun.stunprotocol.org",
          },
        ],
      });

      const desc = new webrtc.RTCSessionDescription(body.sdp);

      console.log("set remote description");
      await peer.setRemoteDescription(desc);

      senderStream &&
        senderStream.getTracks().forEach((track) => {
          console.log("sending tracks");
          peer.addTrack(track, senderStream);
        });

      console.log("creating answer");
      const answer = await peer.createAnswer();

      console.log("in setLocalDescription");
      await peer.setLocalDescription(answer);

      console.log("consumer_res");
      socket.emit("consumer_res", {
        sdp: peer.localDescription,
      });

      consoleSpacing();
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    consoleSpacing();
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/game", (req, res) => {
  console.log("HERE");
  res.json();
});

process.once("SIGUSR2", function () {
  process.kill(process.pid, "SIGUSR2");
});

process.on("SIGINT", function () {
  // this is only called on ctrl+c, not restart
  process.kill(process.pid, "SIGINT");
});
