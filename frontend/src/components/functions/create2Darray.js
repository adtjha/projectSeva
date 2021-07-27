import Constants from "../Constants";
import replaceCell from "./placeCell";
import { placePiece } from "./placePiece";
import _ from "lodash";

export default function create2Darray(data) {
  // red player piece placement
  const colors = ["red", "green", "yellow", "blue"];
  var board = _.cloneDeep(Constants.DEFAULT_CELL_LAYOUT);
  var updated2DArray = [];

  colors.forEach((e) => {
    updated2DArray = Object.assign(updated2DArray, replaceCell(e, board));
    board = Object.assign(board, updated2DArray);
  });

  Object.keys(data).forEach((e) => {
    if (colors.includes(e)) {
      updated2DArray = placePiece(data[e], e, _.cloneDeep(board));
      board = _.cloneDeep(updated2DArray);
    }
  });

  return updated2DArray;
}
