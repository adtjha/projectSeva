const { changeCurrentPlayer } = require("./changeCurrentPlayer");
const { autoMovePlayerPiece } = require("./autoMovePlayerPiece");
const { piecesOut, piecesOnFinal } = require("../../constant");
const { client } = require("../../..");

let i = 0;

function diceRoll(socket, io) {
  return async ({ gameId, userId }) => {
    // console.log("roll dice on server");
    // const diceArray = [6, 4, 6, 3, 1, 2];
    // consoleSpacing(" " + i + " ");
    // const face = i > diceArray.length - 1 ? Math.ceil(Math.random() * 6) : diceArray[i++];
    // const face = 6;
    console.log("DICE ROLL");

    const room = JSON.parse(await client.get(gameId));

    const face = Math.ceil(Math.random() * 6);
    room.dice = face;

    // socket.emit("dice_rolled", { face });
    io.in(gameId).emit("dice_rolled", {
      face,
    });

    await client.set(gameId, ".", JSON.stringify(room), "XX");

    const pieceOut = piecesOut(room.players[userId].pos);
    const pieceOnFinal = piecesOnFinal(room.players[userId].pos);

    if (
      pieceOut === 0 &&
      face !== 6 &&
      pieceOnFinal.filter((e) => e + face === 57).length === 0
    ) {
      // console.log("No Piece Out and not a Six, switching player", face);
      setTimeout(
        () => changeCurrentPlayer(socket, io)({ game_id: gameId, userId }),
        300
      );
      // () => changeCurrentPlayer(socket, io)({ game_id: gameId });
    } else if (
      pieceOut === 1 ||
      (pieceOut === 0 && pieceOnFinal.length === 1)
    ) {
      // console.log("Single Piece Out, Auto Moving", face);
      setTimeout(
        () => autoMovePlayerPiece(socket, io)({ gameId, face, userId }),
        300
      );
      // () => autoMovePlayerPiece(socket, io)({ gameId, face });
    }

    console.log("DICE ROLL DONE");
  };
}
exports.diceRoll = diceRoll;
