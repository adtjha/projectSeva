import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { diceReducer } from './dice'
import { movesReducer } from './move'
import { usersReducer } from './user'
import rootSaga from './saga'

/**
 * Redux Store, essential to store frontend data.
 */

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    combineReducers({
        move: movesReducer,
        dice: diceReducer,
        user: usersReducer,
    }),
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
