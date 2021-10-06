const { v4: uuidv4 } = require("uuid");
const { changeCurrentPlayer } = require("./changeCurrentPlayer");
const { autoMovePlayerPiece } = require("./autoMovePlayerPiece");

let i = 0;

function diceRoll(socket, io) {
  return ({ gameId }) => {
    // console.log("roll dice on server");
    const diceArray = [6, 4, 6, 3, 1, 2];
    // consoleSpacing(" " + i + " ");
    const face = i > diceArray.length - 1 ? Math.ceil(Math.random() * 6) : diceArray[i++];
    // const face = 6;
    // const face = Math.ceil(Math.random() * 6);
    rooms.get(gameId).dice = face;

    // socket.emit("dice_rolled", { face });
    io.in(gameId).emit("dice_rolled", {
      face,
    });

    const pieceOut = piecesOut(rooms.get(gameId).players.get(socket.id).pos);
    const pieceOnFinal = piecesOnFinal(
      rooms.get(gameId).players.get(socket.id).pos
    );

    if (pieceOut === 0 &&
      face !== 6 &&
      pieceOnFinal.filter((e) => e + face === 57).length === 0) {
      // console.log("No Piece Out and not a Six, switching player", face);
      setTimeout(
        () => changeCurrentPlayer(socket, io)({ game_id: gameId }),
        300
      );
      // () => changeCurrentPlayer(socket, io)({ game_id: gameId });
    } else if (pieceOut === 1 ||
      (pieceOut === 0 && pieceOnFinal.length === 1)) {
      // console.log("Single Piece Out, Auto Moving", face);
      setTimeout(() => autoMovePlayerPiece(socket, io)({ gameId, face }), 300);
      // () => autoMovePlayerPiece(socket, io)({ gameId, face });
    }
  };
}
exports.diceRoll = diceRoll;
