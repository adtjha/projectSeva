const express = require("express");
const app = express();
const { Server } = require("socket.io");
const process = require("process");
// const path = require("path");

const port = process.env.PORT || 8888;

// app.use(express.static("frontend/build"));

const server = app.listen(port, () => {
  console.log(`Server started at ${port}.`);
});

const io = new Server(server, { cors: { origin: "*" } });
require("./src/socket")(io);

app.get("/", (req, res) => {
  console.log("Hello World!");
});

// app.get("/*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });
