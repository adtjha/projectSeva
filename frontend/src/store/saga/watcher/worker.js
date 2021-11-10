import { takeLatest, takeEvery, takeLeading } from 'redux-saga/effects'
import { NEXT, UPDATE } from '../../user'
import { MOVE, UPDATE_POS } from '../../move'
import { switchPlayer, handleSwitchPlayer } from '../workers/player'
import { onMovePieceRequest, onMovePiece } from '../workers/move'
import { onDiceRolled, onRollDice, unrollDice } from '../workers/dice'
import { FETCH_DICE, ROLL_DICE_RES } from '../../dice'

// Watcher
export const socketWorker = function* (socket) {
    // yield takeLatest(CONFIG, setInitialState)

    yield takeLatest(FETCH_DICE, onRollDice, socket)
    yield takeLatest(ROLL_DICE_RES, onDiceRolled)
    yield takeLeading('unroll dice', unrollDice)

    yield takeLatest(UPDATE_POS, onMovePiece)
    yield takeLatest(MOVE, onMovePieceRequest, socket)

    yield takeLatest(NEXT, switchPlayer, socket)
    yield takeEvery(UPDATE, handleSwitchPlayer)
}
