const consoleSpacing = () => {
  console.log(" ");
  console.log("-----------------------");
  console.log(" ");
};
const roomDefault = {
  id: "",
  players: [
    {
      color: "red",
      id: "",
      piece: [0, 0, 0, 0],
      stream: "",
    },
    {
      color: "green",
      id: "",
      piece: [0, 0, 0, 0],
      stream: "",
    },
    {
      color: "yellow",
      id: "",
      piece: [0, 0, 0, 0],
      stream: "",
    },
    {
      color: "blue",
      id: "",
      piece: [0, 0, 0, 0],
      stream: "",
    },
  ],
  currentPlayer: "",
};

const rooms = [];

const hasEmpty = (empty) => {
  rooms.every((r) => {
    r.players.every((p) => {
      if (p.id === "") {
        empty.state = true;
        empty.color = p.color;
        return false;
      } else return true;
    });
    if (empty.state) {
      empty.id = r.id;
      empty.current = r.currentPlayer;
      return false;
    } else return true;
  });

  return empty;
};

const players = ["red", "green", "blue", "yellow"];

export { hasEmpty };
export { rooms };
export { roomDefault };
export { consoleSpacing };
export { players };
export { ice_servers };
