const express = require("express");
const app = express();
const { Server } = require("socket.io");
const port = 8888;
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

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

  // join a game,
  socket.on("join_game", () => {
    // if room empty -> fit user in room array -> send room id
    let empty = { id: "", state: "", color: "" },
      config = { id: "", user: { id: "", color: "" } };

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
    console.group("Room Data");
    console.log(JSON.stringify(rooms));
    console.groupEnd();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/game", (req, res) => {
  console.log("HERE");
  res.json();
});
