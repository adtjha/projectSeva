import { fork, cancel, spawn, takeLatest, cancelled } from 'redux-saga/effects'
import { read, setInitialState } from './workers/read'
import { socketWorker } from './watcher/worker'
import { CONNECT, DISCONNECT } from '../user'
import Constants from '../../Constants'
import { io } from 'socket.io-client'
import { END, eventChannel } from '@redux-saga/core'

const connectSocket = function* (socket, action) {
    const connectChannel = eventChannel((emit) => {
        socket.emit('join_game', action.payload, (res) => {
            console.log(res)
            emit({ ...res })
        })

         return () => {
             emit(END)
         }
    })

    try {
        while (true) {
            yield takeLatest(connectChannel, setInitialState)
        }
    } catch (error) {
        if (yield cancelled()) connectChannel.close()
    }
}

export default function* rootSaga() {
    // const socket = yield connect()
    const socket = io(Constants.BASE_API)
    yield takeLatest(CONNECT, connectSocket, socket)

    const socketListens = yield spawn(read, socket)
    const task = yield fork(socketWorker, socket)

    yield takeLatest(
        DISCONNECT,
        function* () {
            yield cancel(task)
            yield cancel(socketListens)
        },
        task
    )
}
