const express = require("express");
const app = express();
const { Server } = require("socket.io");
const port = 8888;
const cors = require('cors');

app.use(cors())

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('new_game', () => {
    socket.emit('data', {
      id: "374a8d06-4a2c-45ec-a631-ff2d5730a17c",
    });
  })

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/game', (req, res) => {
  console.log("HERE")
  res.json();
})