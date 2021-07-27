import Constants from "../Constants";
import _ from "lodash";

export function placePiece(colorArray, color, board) {
  colorArray.forEach((e, i) => {
    // find location to move
    var [x] = locate(e, color);
    // location has other pieces as well,
    // place the piece with all other
    // place the piece, if no other
    board[x].has.push(color[0].concat(i + 1));
  });
  return _.cloneDeep(board)
}
// find location piece to be on. and return
function locate(num, color) {
  const pathName = color.toUpperCase() + "_PATH";
  const path = _.cloneDeep(Constants[pathName]);
  var x;

  for (let i = 0; i < path.length; i++) {
    const cell = path[i];
    if (cell === num) {
      x = i;
    }
  }
  
  return [x];
}
