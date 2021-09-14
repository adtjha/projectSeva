import { put, take, select } from 'redux-saga/effects'
import { next_player } from 'store/user'
import { getUpdatePos, update_arr } from 'store/move'

export const onMovePiece = function* () {
    try {
        const { color, new_pos, index } = yield select(getUpdatePos)
        console.log('Get updated variables')
        yield put(update_arr({ color, new_pos, index }))
        console.log('position updated')
    } catch (e) {
        console.warn(e)
    }
}

export const autoMovePiece = function* () {
    try {
        const { color, new_pos, index } = yield select(getUpdatePos)
        console.log('Get updated variables')
        yield put(update_arr({ color, new_pos, index }))
        console.log('position updated')
    }
    catch (e) {
        console.error(e)
    }
}

export const onMovePieceRequest = function* (socket, action) {
    yield socket.emit('move_piece', action.payload)
}
