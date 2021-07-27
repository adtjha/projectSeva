import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { diceReducer } from "./dice";
import { movesReducer } from "./move";
import { usersReducer } from "./user";


export const store = createStore(combineReducers({
  move: movesReducer,
  dice: diceReducer,
  user: usersReducer
}), composeWithDevTools());
