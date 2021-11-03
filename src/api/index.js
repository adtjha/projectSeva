const express = require("express");
const api = express.Router();
const channel = require("./channel");

api.get("/test", (req, res) => {
  res.send({
    result: true,
    data: new Date().toLocaleString(),
  });
});

api.use("/channel", channel);

module.exports = api;
