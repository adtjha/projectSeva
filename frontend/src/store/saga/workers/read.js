import extractObject from '../../../components/Game/functions/extractObject'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { set_dice } from '../../dice'
import { set_players } from '../../move'
import { create_device, getRtpCapabilities, set_config } from '../../user'
import { suscribe } from './suscribe'
import { Device } from 'mediasoup-client'

// Worker

export function* read(socket) {
    const channel = yield call(suscribe, socket)

    yield takeLatest(channel, function* (action) {
        console.log(action)
        yield put(action)
    })
}

export function* setInitialState({ fen, dice, data }) {
    const { red, green, yellow, blue } = extractObject(fen)

    if (data) {
        yield put(
            set_config({
                id: data.user.id,
                game_id: data.id,
                current: data.current,
                color: data.user.color,
                rtpCapabilities: { ...data.rtpCapabilities },
            })
        )
    }

    if (dice) {
        yield put(set_dice(dice))
    }

    if (fen) {
        yield put(set_players({ red, green, yellow, blue }))
    }

    // Mediasoup Config
    let device = new Device()
    const rtp = yield select(getRtpCapabilities)
    yield device.load({ routerRtpCapabilities: { ...rtp } })
    yield put(create_device(device))

    return
}
