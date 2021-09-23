import extractObject from 'components/functions/extractObject'
import { call, put, takeLatest } from 'redux-saga/effects'
import { set_dice } from 'store/dice'
import { set_players } from 'store/move'
import { set_config } from 'store/user'
import { suscribe } from './suscribe'

// Worker

export function* read(socket) {
    const channel = yield call(suscribe, socket)

    yield takeLatest(channel, function* (action) {
        console.log(action)
        yield put(action)
    })
}

export function* setInitialState(action) {
    const { fen, dice, data } = action.payload

    const { red, green, yellow, blue } = extractObject(fen)

    if (data) {
        yield put(
            set_config({
                id: data.user.id,
                game_id: data.id,
                current: data.current,
                color: data.user.color,
            })
        )
    }

    if (dice) {
        yield put(set_dice(dice))
    }

    if (fen) {
        yield put(set_players({ red, green, yellow, blue }))
    }
}
