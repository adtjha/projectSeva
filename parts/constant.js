const { v4: uuidv4 } = require("uuid");

const consoleSpacing = () => {
  console.log(" ");
  console.log("-----------------------");
  console.log(" ");
};

const redPlayer = {
  color: "red",
  pos: ["r1", "r2", "r3", "r4"],
  stream: "",
};

const greenPlayer = {
  color: "green",
  pos: ["g1", "g2", "g3", "g4"],
  stream: "",
};

const yellowPlayer = {
  color: "yellow",
  pos: ["y1", "y2", "y3", "y4"],
  stream: "",
};

const bluePlayer = {
  color: "blue",
  pos: ["b1", "b2", "b3", "b4"],
  stream: "",
};

const roomDefault = {
  players: new Map(),
  current: "",
};

const rooms = new Map();

const hasEmpty = (empty) => {
  let playerColors = [...players];

  if (rooms.size !== 0) {
    // check if loop run for first time.
    for (const [id, room] of rooms) {
      if (room.players.size < 4) {
        // room empty
        empty.id = id;
        empty.current = room.current;

        // remove colors already taken from playerColor
        room.players.forEach((player, id, map) => {
          playerColors = playerColors.filter((color) => color !== player.color);
        });

        empty.state = true;
        empty.color = playerColors[0];
        return empty;
      } else {
        // room full
        empty.state = false;
      }
    }
  } else {
    empty.state = false;
  }
  
  return empty;
};

const arrDiff = (arr1, arr2) => {
  arr2.forEach((e) => {
    arr1 = arr1.filter((x) => x !== e);
  });

  return arr1;
};
const newPos = (dice, pos) => {
  return isNaN(pos) ? (pos.split("")[1] !== 0 ? 1 : pos) : (pos += dice);
};
const newArr = (dice, pos, arr) => {
  return arr.map((x) => (x === pos ? newPos(dice, pos) : x));
};
const noPieceOut = (arr) => {
  return arr.every((x) => isNaN(x));
};
const cell_types = {
  begin: [1],
  final: [44, 45, 46, 47],
  end: [48],
};
const isSafe = (pos) => {
  return Object.keys(cell_types).every(
    (type) => cell_types[type].findIndex(pos) === -1
  );
};
const players = ["red", "green", "blue", "yellow"];

exports.greenPlayer = greenPlayer;
exports.redPlayer = redPlayer;
exports.players = players;
exports.noPieceOut = noPieceOut;
exports.newArr = newArr;
exports.hasEmpty = hasEmpty;
exports.bluePlayer = bluePlayer;
exports.yellowPlayer = yellowPlayer;
exports.rooms = rooms;
exports.roomDefault = roomDefault;
exports.consoleSpacing = consoleSpacing;
exports.isSafe = isSafe;
exports.arrDiff = arrDiff;