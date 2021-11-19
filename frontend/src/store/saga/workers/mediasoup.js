import { END, eventChannel } from '@redux-saga/core'
import { cancelled, select, takeLatest } from '@redux-saga/core/effects'
import { getGameId, getUserId } from '../../user'

export function* createSendTransport(socket) {
    const roomId = yield select(getGameId)
    const userId = yield select(getUserId)
    const channel = eventChannel((emit) => {
        socket.emit(
            'createWebRtcTransport',
            { consumer: false, roomId, userId },
            (res) => {
                console.log('------------------------------------')
                emit({ payload: res, type: 'createWebRtcTransport' })
            }
        )

        return () => {
            emit(END)
        }
    })

    try {
        while (true) {
            yield takeLatest(channel, function* (action) {
                console.log(action)
                switch (action.type) {
                    case 'createWebRtcTransport':
                        yield console.log('params', action.payload)
                        return
                    default:
                        return
                }
            })
        }
    } catch (error) {
        if (yield cancelled()) channel.close()
    }
}
