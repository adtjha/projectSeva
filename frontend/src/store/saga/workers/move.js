import { put, select, delay } from 'redux-saga/effects'
import { un_roll_dice } from '../../dice'
import { getBlue, getGreen, getRed, getUpdatePos, getYellow, update_arr } from '../../move'

export const onMovePiece = function* () {
    try {
        const { color, new_pos, index } = yield select(getUpdatePos)
        
        const red = yield select(getRed)
        const green = yield select(getGreen)
        const blue = yield select(getBlue)
        const yellow = yield select(getYellow) 
        yield delay(300)
        yield put(update_arr({ color, new_pos, index }))
        console.log(
            [red, green, blue, yellow].filter((arr) => arr.length === 4).length
        )
        if (
            [red, green, blue, yellow].filter((arr) => arr.length === 4)
                .length >= 1
        ) {
            yield put(un_roll_dice())
        }
    } catch (e) {
        console.warn(e)
    }
}

export const onMovePieceRequest = function* (socket, action) {
    yield socket.emit('move_piece', action.payload)
}
