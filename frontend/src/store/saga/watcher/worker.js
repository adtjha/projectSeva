import { fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { CONFIG, NEXT, UPDATE } from 'store/user'
import { AUTO_MOVE, MOVE, UPDATE_POS } from 'store/move'
import { switchPlayer, handleSwitchPlayer } from '../workers/player'
import { onMovePieceRequest, onMovePiece, autoMovePiece } from '../workers/move'
import { onDiceRolled, onRollDice } from '../workers/dice'
import { FETCH_DICE, ROLL_DICE_RES } from 'store/dice'
import { setInitialState } from '../workers/read'

// Watcher
export const socketWorker = function* (socket) {
    yield takeLatest(CONFIG, setInitialState)

    yield takeLatest(FETCH_DICE, onRollDice, socket)
    yield takeLatest(ROLL_DICE_RES, onDiceRolled)

    yield takeLatest(UPDATE_POS, onMovePiece)
    yield takeLatest(MOVE, onMovePieceRequest, socket)

    yield takeLatest(NEXT, switchPlayer, socket)
    yield takeEvery(UPDATE, handleSwitchPlayer)
}
