
const { autoMovePlayerPiece } = require("./game/autoMovePlayerPiece");
const { changeCurrentPlayer } = require("./game/changeCurrentPlayer");
const { connectPlayer } = require("./game/connectPlayer");
const { diceRoll } = require("./game/diceRoll");
const { disconnectPlayer } = require("./game/disconnectPlayer");
const { movePiece } = require("./game/movePiece");
const { resetPiece } = require("./game/resetPiece");
const { endGame } = require("./game/endGame");

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
    
    console.log(socket.id);
    socket.emit("connection-success", {
      socketId: socket.id,
    });
    
    socket.on("disconnect", () => {});
    
    socket.on("createRoom", () => {});
    
    socket.on("createWebRtcTransport", () => {});
    
    socket.on("transport-connect", () => {});
    
    socket.on("transport-produce", () => {});
    
    socket.on("transport-recv-connect", () => {});
    
    socket.on("consume", () => {});
    
    socket.on("consumer-resume", () => {});
  });
};


