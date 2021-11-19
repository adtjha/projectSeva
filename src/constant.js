const consoleSpacing = (message) => {
  console.log(" ");
  console.log(`-----------------------${message}-----------------------`);
  console.log(" ");
};

const redPlayer = {
  color: "red",
  pos: ["r1", "r2", "r3", "r4"],
  stream: "",
  socketId: "",
  transport: {},
  producer: {},
  consumer: {},
};

const greenPlayer = {
  color: "green",
  pos: ["g1", "g2", "g3", "g4"],
  stream: "",
  socketId: "",
  transport: {},
  producer: {},
  consumer: {},
};

const yellowPlayer = {
  color: "yellow",
  pos: ["y1", "y2", "y3", "y4"],
  stream: "",
  socketId: "",
  transport: {},
  producer: {},
  consumer: {},
};

const bluePlayer = {
  color: "blue",
  pos: ["b1", "b2", "b3", "b4"],
  stream: "",
  socketId: "",
  transport: {},
  producer: {},
  consumer: {},
};

const roomDefault = {
  players: {},
  current: "",
  dice: 1,
};

var roomsCount = 1;

var roomIdsHaveSpace = {
  "2eo3": ["red", "green", "blue", "yellow"],
};

var rooms = {
  "2eo3": { players: {}, current: "red", dice: 1 },
};

const hasEmpty = (empty, room_id) => {
  let playerColors = [...players];

  if (Object.keys(rooms).length !== 0) {
    // check if room exsists, if yes, return empty room details
    if (room_id && rooms.hasOwnProperty(room_id)) {
      if (Object.keys(rooms[room_id].players).length < 4) {
        empty.id = room_id;
        empty.current = rooms[room_id].current;

        rooms[room_id].players.forEach((player) => {
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
    for (const [id, room] of Object.entries(rooms)) {
      if (Object.keys(room.players).length < 4) {
        // room empty
        empty.id = id;
        empty.current = room.current;

        // remove colors already taken from playerColor
        Object.values(room.players).forEach((player) => {
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
  console.log(dice, pos);
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

const generateFEN = (roomPlayers) => {
  let fen = "",
    color = "",
    present = [];

  consoleSpacing("-");

  Object.values(roomPlayers).forEach((player) => {
    color = player.color;
    present.push(color);
    console.log(color);
    player.pos.forEach((p, i) => {
      fen = fen.concat(`${color.split("")[0]}`);
      fen = isNaN(p) ? fen.concat(`0`) : fen.concat(`${p}`);
    });
    fen = fen.concat("/");
  });

  fen = fen[fen.length - 1] === "/" ? fen.slice(0, fen.length - 1) : fen;

  return fen;
};

const newArr = (new_pos, arr, index) => {
  return arr.map((x, i) => (i === index ? new_pos : x));
};

const noPieceOut = (arr) => {
  return arr.every((x) => isNaN(x));
};

const piecesOut = (arr) => {
  return arr.filter((i) => !isNaN(i) && i < 52 && i >= 1).length;
};

const piecesOnFinal = (arr) => {
  return arr.filter((i) => !isNaN(i) && i >= 52 && i < 57);
};

const cell_types = {
  begin: [1],
  safe: [9, 22, 35, 48],
  final: [52, 53, 54, 55, 56],
  end: [57],
};

const safe_cell = [1, 9, 14, 22, 27, 35, 40, 48, 52, 53, 54, 55, 56, 57];

const isSafe = (pos) => {
  return safe_cell.findIndex((e) => e === pos) !== -1;
};

const players = ["red", "blue", "yellow", "green"];

const offset = {
  red: {
    red: 0,
    green: 39,
    blue: 26,
    yellow: 13,
  },
  green: {
    red: 13,
    green: 0,
    blue: 39,
    yellow: 26,
  },
  blue: {
    red: 26,
    green: 13,
    blue: 0,
    yellow: 39,
  },
  yellow: {
    red: 39,
    green: 26,
    blue: 13,
    yellow: 0,
  },
};

const otherPLayerPosArray = (pos, color) => {
  const otherPlayers = players.filter((e) => e !== color);
  let otherPLayerPos = {};

  otherPlayers.forEach((e) => {
    const off = offset[color][e];
    let newPos = pos + off;
    newPos = newPos <= 0 ? 52 - newPos : newPos;
    otherPLayerPos[e] = newPos > 52 ? newPos - 52 : newPos;
  });

  return otherPLayerPos;
};

const mediaCodecs = [
  {
    kind: "audio",
    mimeType: "audio/opus",
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: "video",
    mimeType: "video/VP8",
    clockRate: 90000,
    parameters: {
      "x-google-start-bitrate": 1000,
    },
  },
];

const webRtcTransport_options = {
  listenIps: [
    {
      ip: "0.0.0.0", // replace with relevant IP address
      announcedIp: "10.0.0.115",
    },
  ],
  enableUdp: true,
  enableTcp: true,
  preferUdp: true,
};

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
exports.generateFEN = generateFEN;
exports.piecesOnFinal = piecesOnFinal;
exports.mediaCodecs = mediaCodecs;
exports.webRtcTransport_options = webRtcTransport_options;
