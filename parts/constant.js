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
  if (isNaN(pos)) {
    return dice === 6 ? 1 : pos;
  } else if (pos >= 1 && pos < 52) {
    return pos + dice;
  } else if (52 <= pos && pos < 57) {
    return 57 - pos >= dice ? pos + dice : pos;
  } else {
    return pos;
  }
};

const newArr = (dice, pos, arr) => {
  return arr.map((x) => (x === pos ? newPos(dice, pos) : x));
};

const noPieceOut = (arr) => {
  return arr.every((x) => isNaN(x));
};

const cell_types = {
  begin: [1],
  final: [52, 53, 54, 55, 56],
  end: [57],
};

const isSafe = (pos) => {
  return Object.keys(cell_types).every(
    (type) => cell_types[type].findIndex(pos) === -1
  );
};

const players = ["red", "green", "blue", "yellow"];

// [red, green, yellow, blue]
// prettier-ignore
const colliding = [
  [9, 42, 20, 31],
  [20, 9, 31, 42],
  [42, 31, 9, 20],
  [31, 20, 42, 9],

  [10, 43, 21, 32],
  [21, 10, 32, 43],
  [43, 32, 10, 21],
  [32, 21, 43, 10],

  [8, 41, 19, 30],
  [19, 8, 30, 41],
  [41, 30, 8, 19],
  [30, 19, 41, 8],

  [13, 2, 24, 35],
  [24, 13, 35, 2],
  [2, 35, 13, 24],
  [35, 24, 2, 13],

  [6, 39, 17, 28],
  [17, 6, 28, 39],
  [39, 28, 6, 17],
  [28, 17, 39, 6],

  [14, 3, 25, 36],
  [25, 14, 36, 3],
  [3, 36, 14, 25],
  [36, 25, 3, 14],

  [5, 38, 16, 27],
  [16, 5, 27, 38],
  [38, 27, 5, 16],
  [27, 16, 38, 5],

  [15, 4, 26, 37],
  [26, 15, 37, 4],
  [4, 37, 15, 26],
  [37, 26, 4, 15],
];

// [12, 1, 23, 34], green-start
// [7, 40, 18, 29], safe-cell
// [1, 34, 12, 23], red-start
// [18, 7, 29, 40], safe-cell
// [23, 12, 34, 1], blue-start
// [29, 18, 40, 7], safe-cell
// [34, 23, 1, 12], yellow-start
// [40, 29, 7, 18], safe-cell

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
