import { take, fork, cancel, spawn } from 'redux-saga/effects'
import { connect } from './workers/connect'
import { read } from './workers/read'
import { socketWorker } from './watcher/worker'
import { CONNECT, DISCONNECT } from 'store/user'

export default function* rootSaga() {
    const { payload } = yield take(CONNECT)
    const socket = yield connect()
    socket.emit('join_game', payload)

    yield spawn(read, socket)
    const task = yield fork(socketWorker, socket)

    let action = yield take(DISCONNECT)
    if (action.type) yield cancel(task)
}
