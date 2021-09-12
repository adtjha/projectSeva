import { put, take, select } from 'redux-saga/effects'
import { next_player } from 'store/user'
import { set_rolled } from 'store/dice'
import { getUpdatePos, MOVE, update_arr } from 'store/move'

export const onMovePiece = function* () {
    try {
        const { color, new_pos, index } = yield select(getUpdatePos)
        console.log('Get updated variables')
        yield put(update_arr({ color, new_pos, index }))
        yield put(next_player())
        console.log('position updated')
    } catch (e) {
        console.warn(e)
    }
}

export const onMovePieceRequest = function* (socket) {
    while (true) {
        const { payload } = yield take(MOVE)
        socket.emit('move_piece', payload)
    }
}

/**
 * move piece request
 * move piece resolved
 * reset piece request
 * reset piece resolved
 */
