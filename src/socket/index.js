const { v4: uuidv4 } = require("uuid");
const { autoMovePlayerPiece } = require("./autoMovePlayerPiece");
const { changeCurrentPlayer } = require("./changeCurrentPlayer");
const {
  consoleSpacing,
  rooms,
  roomDefault,
  players,
  newArr,
  newPos,
  piecesOut,
  otherPLayerPosArray,
  isSafe,
  error_codes,
  piecesOnFinal,
} = require("../constant");
const { connectPlayer } = require("./connectPlayer");
const { diceRoll } = require("./diceRoll");
const { disconnectPlayer } = require("./disconnectPlayer");
const { movePiece } = require("./movePiece");
const { resetPiece } = require("./resetPiece");
const { endGame } = require("./endGame");

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("join_game", connectPlayer(socket, io));

    socket.on("roll_dice", diceRoll(socket, io));

    socket.on("auto_move", autoMovePlayerPiece(socket, io));

    socket.on("change", changeCurrentPlayer(socket, io));

    socket.on("move_piece", movePiece(socket, io)); // moving, Check end here.

    socket.on("reset_piece", resetPiece(socket, io));

    socket.on("end_game", endGame(socket, io));

    socket.on("disconnect", disconnectPlayer(socket));
  });
};


