import { take, fork, cancel, spawn, takeLatest, takeEvery, all } from 'redux-saga/effects'
import { connect } from './workers/connect'
import { read } from './workers/read'
import { socketWorker } from './watcher/worker'
import { CONNECT, DISCONNECT, NEXT, UPDATE } from 'store/user'
import Constants from 'Constants'
import { io } from 'socket.io-client'
import { FETCH_DICE, ROLL_DICE_RES } from 'store/dice'
import { onDiceRolled, onRollDice } from './workers/dice'
import { MOVE, UPDATE_POS } from 'store/move'
import { onMovePiece, onMovePieceRequest } from './workers/move'
import { handleSwitchPlayer, switchPlayer } from './workers/player'

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
