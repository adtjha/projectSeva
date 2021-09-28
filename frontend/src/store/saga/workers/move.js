import { put, select, delay } from 'redux-saga/effects'
import { getUpdatePos, update_arr } from 'store/move'
import { getDice, set_rolled } from 'store/dice'

export const onMovePiece = function* () {
    try {
        const { color, new_pos, index } = yield select(getUpdatePos)
        yield delay(10000)
        yield put(update_arr({ color, new_pos, index }))
        yield put(set_rolled(false))
    } catch (e) {
        console.warn(e)
    }
}

export const onMovePieceRequest = function* (socket, action) {
    yield socket.emit('move_piece', action.payload)
    const dice = yield select(getDice)
    if (dice === 6) {
        yield put(set_rolled(false))
    }
}
