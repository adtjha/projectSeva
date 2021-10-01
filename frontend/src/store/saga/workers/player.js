import { put, select } from 'redux-saga/effects'
import { getColor, getGameCurrentPlayer, getGameId } from 'store/user'
import { rolled, set_rolled } from 'store/dice'

export const switchPlayer = function* (socket) {
    const game_id = yield select(getGameId)
    yield put(set_rolled(false))
    yield socket.emit('change', { game_id })
}

export const handleSwitchPlayer = function* () {
    // const userColor = yield select(getColor)
    // const currentPlayer = yield select(getGameCurrentPlayer)
    // const hasRolled = yield select(rolled)
    // if (userColor === currentPlayer && hasRolled) {
    //     // reset for safety
    //     yield put(set_rolled(false))
    // }
}
