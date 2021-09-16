const { v4: uuidv4 } = require("uuid");

const consoleSpacing = (message) => {
  console.log(" ");
  console.log(`-----------------------${message}-----------------------`);
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

const hasEmpty = (empty, room_id) => {
  let playerColors = [...players];

  if (rooms.size !== 0) {
    // check if room exsists, if yes, return empty room details
    if (room_id && rooms.has(room_id)) {
      if (rooms.get(room_id).players.size < 4) {
        empty.id = room_id;
        empty.current = rooms.get(room_id).current;

        rooms.get(room_id).players.forEach((player, id, map) => {
          playerColors = playerColors.filter((color) => color !== player.color);
        });

        empty.state = true;
        empty.color = playerColors[0];
      } else {
        // room full
        empty.state = false;
      }
    }

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
    return dice === 6 ? 1 : -1;
  } else if (pos >= 1 && pos < 52) {
    return pos + dice;
  } else if (52 <= pos && pos < 57) {
    return 57 - pos >= dice ? pos + dice : -1;
  } else {
    return -1;
  }
};

const newArr = (new_pos, arr, index) => {
  return arr.map((x, i) => (i === index ? new_pos : x));
};

const noPieceOut = (arr) => {
  return arr.every((x) => isNaN(x));
};

const piecesOut = (arr) => {
  return arr.filter((i) => !isNaN(i) && i < 57 && i >= 1).length;
};

const cell_types = {
  begin: [1],
  safe: [9, 22, 35, 48],
  final: [52, 53, 54, 55, 56],
  end: [57],
};

const isSafe = (pos) => {
  return Object.keys(cell_types).every(
    (type) => cell_types[type].findIndex((i) => i === pos) !== -1
  );
};

const players = ["red", "green", "blue", "yellow"];

// [red, green, blue, yellow]
// prettier-ignore
const colliding = [
  [09, 42, 31, 20],
  [20, 09, 42, 31],
  [42, 31, 20, 09],
  [31, 20, 09, 42],

  [10, 43, 32, 21],
  [21, 10, 43, 32],
  [43, 32, 21, 10],
  [32, 21, 10, 43],

  [08, 41, 30, 19],
  [19, 08, 41, 30],
  [41, 30, 19, 08],
  [30, 19, 08, 41],

  [13, 02, 35, 24],
  [24, 13, 02, 35],
  [02, 35, 24, 13],
  [35, 24, 13, 02],

  [06, 39, 28, 17],
  [17, 06, 39, 28],
  [39, 28, 17, 06],
  [28, 17, 06, 39],

  [14, 03, 36, 25],
  [25, 14, 03, 36],
  [03, 36, 25, 14],
  [36, 25, 14, 03],

  [05, 38, 27, 16],
  [16, 05, 38, 27],
  [38, 27, 16, 05],
  [27, 16, 05, 38],

  [15, 04, 37, 26],
  [26, 15, 04, 37],
  [04, 37, 26, 15],
  [37, 26, 15, 04],
];

/**
 * colliding =  [1,2,3,4,5,6,8,9,10,13,14,15,16,17,19,20,21,24,25,26,27,28,30,31,32,33,34,36,37,38,39,41,42,43,44,45,46,47,49,50,51]
 * [  r,  g,  b,  y ]
 * [ 01, 40, 27, 14 ]
 * [ 02, 41, 28, 15 ]
 *
 * [ 00, 39, 26, 13 ]
 * pos + offset > 52 ? (pos + offset - 52) : (pos + offset)
 * [ 14, 01, 40, 27]
 */

const offset = { red: 00, green: 39, blue: 26, yellow: 13 };

const otherPLayerPosArray = (pos, color) => {
  const otherPlayers = players.filter((e) => e !== color);
  let otherPLayerPos = {};

  otherPlayers.forEach((e) => {
    const off = offset[e];
    otherPLayerPos[e] = pos + off > 52 ? pos + off - 52 : pos + off;
  });

  consoleSpacing("-");
  console.log(otherPLayerPos);
  consoleSpacing("-");

  return otherPLayerPos;
};

// [1, 34, 12, 23], red-start
// [12, 1, 23, 34], green-start
// [34, 23, 1, 12], yellow-start
// [23, 12, 34, 1], blue-start
// [7, 40, 18, 29], safe-cell
// [18, 7, 29, 40], safe-cell
// [29, 18, 40, 7], safe-cell
// [40, 29, 7, 18], safe-cell

const error_codes = {
  200: "Can't play this move. Only legal moves allowed.",
};

exports.greenPlayer = greenPlayer;
exports.redPlayer = redPlayer;
exports.players = players;
exports.noPieceOut = noPieceOut;
exports.piecesOut = piecesOut;
exports.newArr = newArr;
exports.newPos = newPos;
exports.hasEmpty = hasEmpty;
exports.bluePlayer = bluePlayer;
exports.yellowPlayer = yellowPlayer;
exports.rooms = rooms;
exports.roomDefault = roomDefault;
exports.consoleSpacing = consoleSpacing;
exports.isSafe = isSafe;
exports.arrDiff = arrDiff;
exports.otherPLayerPosArray = otherPLayerPosArray;
exports.error_codes = error_codes;
