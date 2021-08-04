import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { diceReducer } from './dice'
import { movesReducer } from './move'
import { usersReducer } from './user'

/**
 * Redux Store, essential to store frontend data.
 */

export const store = createStore(
    combineReducers({
        move: movesReducer,
        dice: diceReducer,
        user: usersReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
)
