import { fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { NEXT, UPDATE } from 'store/user'
import { UPDATE_POS } from 'store/move'
import { switchPlayer, handleSwitchPlayer } from '../workers/player'
import { onMovePieceRequest, onMovePiece } from '../workers/move'
import { onDiceRolled, onRollDice } from '../workers/dice'
import { FETCH_DICE, ROLL_DICE_RES } from 'store/dice'

// Watcher
export const socketWorker = function* (socket) {
    yield takeLatest(FETCH_DICE, onRollDice, socket)
    yield takeLatest(ROLL_DICE_RES, onDiceRolled)

    yield takeLatest(UPDATE_POS, onMovePiece)
    
    yield fork(onMovePieceRequest, socket)
    yield takeLatest(NEXT, switchPlayer, socket)
    yield takeEvery(UPDATE, handleSwitchPlayer)
}
