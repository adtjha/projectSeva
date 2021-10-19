import { fork, cancel, spawn, takeLatest } from 'redux-saga/effects'
import { read } from './workers/read'
import { socketWorker } from './watcher/worker'
import { CONNECT, DISCONNECT } from '../user'
import Constants from '../../Constants'
import { io } from 'socket.io-client'

export default function* rootSaga() {
    // const socket = yield connect()
    const socket = io(Constants.BASE_API)
    yield takeLatest(
        CONNECT,
        function* (socket, action) {
            yield socket.emit('join_game', action.payload)
        },
        socket
    )

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
