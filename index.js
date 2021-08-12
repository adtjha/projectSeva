const express = require("express");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const webrtc = require("wrtc");
const process = require("process");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const os = require("os");
const readline = require("readline");

const port = process.env.PORT || 8888;

const consoleSpacing = () => {
  console.log(" ");
  console.log("-----------------------");
  console.log(" ");
};

const rooms = [
  {
    id: "374a8d06-4a2c-45ec-a631-ff2d5730a17c",
    players: [
      {
        color: "red",
        id: "",
        socket_id: "",
        stream: "",
      },
      {
        color: "green",
        id: "",
        socket_id: "",
        stream: "",
      },
      {
        color: "yellow",
        id: "",
        socket_id: "",
        stream: "",
      },
      {
        color: "blue",
        id: "",
        socket_id: "",
        stream: "",
      },
    ],
    currentPlayer: "red",
  },
];

// const ice_servers = require("./servers.json");
const ice_servers = [{ urls: "stun:stun.stunprotocol.org" }];

app.use(cors());
app.use(express.static("frontend/build"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});


const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  consoleSpacing();

  // join a game,
  socket.on("join_game", () => {
    // if room empty -> fit user in room array -> send room id
    let empty = { id: "", state: "", color: "" },
      config = { id: "", user: { id: "", color: "" } };

    rooms.every((r) => {
      r.players.every((p) => {
        if (p.id === "") {
          empty.state = true;
          empty.color = p.color;
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
            if (p.color === empty.color) {
              let uid = uuidv4();
              p.id = uid;
              config.id = empty.id;
              config.user.id = uid;
              config.user.color = empty.color;
              config.current = empty.current;
              p.socket_id = socket.id;
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
          {
            color: "red",
            id: playerId,
            stream: "",
          },
          {
            color: "green",
            id: "",
            stream: "",
          },
          {
            color: "yellow",
            id: "",
            stream: "",
          },
          {
            color: "blue",
            id: "",
            stream: "",
          },
        ],
        currentPlayer: "red",
      });

      config.id = roomId;
      config.user.id = playerId;
      config.user.color = "red";
      config.current = "red";
    }

    socket.emit("config_data", config);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    rooms.forEach((r) => {
      r.players.forEach((p) => {
        if (p.socket_id === socket.id) {
          p.socket_id = "";
          p.id = "";
          p.stream = "";
        }
      });
    });
    consoleSpacing();
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const handletrack = (e, peer, auth) => {
  console.log("adding tracks");
  rooms[auth.index].players[auth.playerIndex].stream = e.streams[0];
};

const authenticate = (body) => {
  const usr = body.user;
  let res = {};
  rooms.forEach((r, i) => {
    if (r.id === usr.game_id) {
      const playerIndex = r.players.findIndex((p) => p.id === usr.id);
      if (playerIndex !== -1) {
        res.verified = true;
        res.playerIndex = r.players.findIndex((p) => p.color === usr.color);
        res.id = r.id;
        res.index = i;
      } else {
        res.verified = false;
      }
    }
  });

  !res.verified && (res.verified = false);
  return res;
};

app.post("/broadcast", async ({ body }, res) => {
  console.log("in broadcast");
  const peer = new webrtc.RTCPeerConnection({
    iceServers: ice_servers,
  });

  const auth = authenticate(body);

  if (body === undefined) {
    res.json({});
  } else {
    console.log("peer");

    peer.ontrack = (e) => handletrack(e, peer, auth);

    const desc = new webrtc.RTCSessionDescription(body.sdp);

    console.log("set remote description");
    await peer.setRemoteDescription(desc);

    console.log("creating answer");
    const answer = await peer.createAnswer();

    console.log("in setLocalDescription");
    await peer.setLocalDescription(answer);

    console.log("broadcast_res");
    res.json({
      sdp: peer.localDescription,
    });

    consoleSpacing();
  }
});

app.post("/consumer", async ({ body }, res) => {
  console.log("in consumer");
  const peer = new webrtc.RTCPeerConnection({
    iceServers: ice_servers,
  });
  const auth = authenticate(body);

  if (body === undefined) {
    res.json({});
  } else {
    const desc = new webrtc.RTCSessionDescription(body.sdp);

    console.log("set remote description");
    await peer.setRemoteDescription(desc);

    const stream = rooms[auth.index].players[auth.playerIndex].stream;

    stream &&
      stream.getTracks().forEach((track) => {
        console.log("sending tracks");
        peer.addTrack(track, stream);
      });

    // senderStream.getTracks().forEach((track) => {
    //   console.log("sending tracks");
    //   peer.addTrack(track, senderStream);
    // });

    console.log("creating answer");
    const answer = await peer.createAnswer();

    console.log("in setLocalDescription");
    await peer.setLocalDescription(answer);

    console.log("consumer_res");
    res.json({
      sdp: peer.localDescription,
    });

    consoleSpacing();
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
