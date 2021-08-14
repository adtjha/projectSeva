import extractObject from '../components/functions/extractObject'
import _ from 'lodash'
// import Constants from '../components/Constants'

const initialState = {
    fen: 'r0r0r0r0/g0g0g0g0/y0y0y0y0/b0b0b0b0 r 4',
}

_.forIn(extractObject(initialState.fen), (v, k) => {
    initialState[k] = v
})

export function movesReducer(state = initialState, action) {
    switch (action.type) {
        case MOVE:
            return {
                ...state,
                [action.payload.color]: state[action.payload.color].map(
                    (p, i) =>
                        i === action.payload.num
                            ? isNaN(p)
                                ? 1
                                : parseInt(p) + parseInt(action.payload.toMove)
                            : p
                ),
            }
        case RESET:
            return {
                ...state,
                [action.payload.color]: state[action.payload.color].map(
                    (p, i) =>
                        i === action.payload.num
                            ? action.payload.color[0].toLowerCase() +
                              i.toString()
                            : p
                ),
            }
        default:
            return state
    }
}

// selectors
export const getRed = (state) => state.move.red
export const getGreen = (state) => state.move.green
export const getYellow = (state) => state.move.yellow
export const getBlue = (state) => state.move.blue

// action types
export const MOVE = 'move'
export const RESET = 'reset'

// action creators
export const move_piece = (toMove, color, num) => ({
    type: MOVE,
    payload: {
        toMove,
        color,
        num,
    },
})
export const reset_piece = (num, color) => ({
    type: RESET,
    payload: color,
})
