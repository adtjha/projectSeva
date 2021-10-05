import { put, delay } from 'redux-saga/effects'
import { set_dice, set_rolled, set_showing } from 'store/dice'

// roll dice request
export const onRollDice = function* (socket, action) {
    try {
        yield put(set_rolled(true))
        console.log('on Roll Dice', action.payload)
        socket.emit('roll_dice', action.payload)
    } catch (err) {
        console.log(err)
    }
}

// roll dice resolved
export const onDiceRolled = function* (action) {
    try {
        console.log('Showing False')
        yield put(set_showing(false))
        yield delay(300)
        console.log('on Dice Rolled', action.payload)
        yield put(set_dice(action.payload.face))
        yield delay(700)
        yield put(set_showing(true))
    } catch (e) {
        console.log(e)
    }
}

export const unrollDice = function* () {
    try {
        yield put(set_rolled(false))
    } catch (e) {
        console.error(e)
    }
}