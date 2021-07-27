import Constants from "../Constants";
import _ from "lodash";

export default function replaceCell(color, board) {
  // Place Cell objects
  for (let i = 0; i < board.length; i++) {
    if (
      Constants[color].id === parseInt(board[i][0]) ||
      ["0", "5", "6"].includes(board[i])
    ) {
      // console.log(board[i], i, color);
      board[i] = placeCellObjects(board[i], i, color);
    }
  }
  // return edited board.
  return board;
}

function placeCellObjects(cellid, i, color) {
  let cellObject,
    j = i % 13;
  // find cell_obj according to cell id,
  // clone cell_obj
  if (cellid.length > 1) {
    cellid = parseInt(cellid);
    // begin cell
    if (Constants[color].begin === cellid) {
      cellObject = _.cloneDeep(Constants["begin_cell_obj"]);
      cellObject.style += " bg-" + color + "-400";

      // final cell
    } else if (Constants[color].final === cellid) {
      cellObject = _.cloneDeep(Constants["final_cell_obj"]);
      cellObject.style += " bg-" + color + "-400";

      // end cell
    } else if (Constants[color].end === cellid) {
      cellObject = _.cloneDeep(Constants["end_cell_obj"]);
      cellObject.style += " bg-" + color + "-400";
    }
  } else {
    if (cellid === "6") {
      // normal cell
      cellObject = _.cloneDeep(Constants["cell_obj"]);
    } else if (cellid === "5") {
      // safe cell
      cellObject = _.cloneDeep(Constants["safe_cell_obj"]);
    } else if (cellid === "0") {
      // empty cell
      cellObject = _.cloneDeep(Constants["empty_cell_obj"]);
    }
  }

  // fill req. data in cell_obj
  cellObject.pos.x = Math.floor(i / 13);
  cellObject.pos.y = j;

  cellObject.style += " col-start-" + (j + 1) + " col-end-" + (j + 2);
  cellObject.id = Constants.LOCATION_BOARD_LAYOUT[i];

  // return cell_obj.
  return cellObject;
}
