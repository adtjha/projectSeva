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
  players: {},
  currentPlayer: "",
};

const rooms = {};

const hasEmpty = (empty) => {
  const playerColors = [...players];

  for (const [id, room] of Object.entries(rooms)) {
    if (Object.keys(room.players) > 2) {
      // room full
    } else {
      // room empty
      empty.id = id;
      empty.current = room.currentPlayer;
      // remove colors already taken from playerColor
      Object.values(room.players).forEach(player => {playerColors = playerColors.filter(color => color === players.color)})
      if (playerColors.length() > 0) {
        empty.state = true
        empty.color = playerColors[0]
      } else {
        empty.state = false
      }
    }
  }

  return empty;
};

const arrDiff = (arr1, arr2) => {
  arr1.forEach(e => )
}

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

export { hasEmpty };
export { rooms };
export { roomDefault };
export { consoleSpacing };
export { players };
export { ice_servers };
export { newArr };
export { noPieceOut };
export { cell_types };
export { redPlayer };
export { greenPlayer };
export { yellowPlayer };
export { bluePlayer };
