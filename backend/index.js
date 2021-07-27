const express = require("express");
const app = express();
const { Server } = require("socket.io");
const port = 8888;
const cors = require('cors')

app.use(cors())

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("geo", (data)=>{
    console.log(data)
  })
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});