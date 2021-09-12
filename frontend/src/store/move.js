import extractObject from '../components/functions/extractObject'
import _ from 'lodash'
// import Constants from '../components/Constants'

const initialState = {
    fen: 'r0r0r0r0/g0g0g0g0/y0y0y0y0/b0b0b0b0 r 4',
    update: {},
}

_.forIn(extractObject(initialState.fen), (v, k) => {
    initialState[k] = v
})

export function movesReducer(state = initialState, action) {
    switch (action.type) {
        case ARRAY:
            if (Object.keys(state.update) < 1) {
                return state
            } else {
                const newArr = [
                    ...state[action.payload.color].slice(
                        0,
                        action.payload.index
                    ),
                    action.payload.new_pos,
                    ...state[action.payload.color].slice(
                        action.payload.index + 1
                    ),
                ]
                console.log(newArr)
                switch (action.payload.color) {
                    case 'red':
                        return {
                            ...state,
                            red: newArr,
                            update: {},
                        }
                    case 'green':
                        return {
                            ...state,
                            green: newArr,
                            update: {},
                        }
                    case 'yellow':
                        return {
                            ...state,
                            yellow: newArr,
                            update: {},
                        }
                    case 'blue':
                        return {
                            ...state,
                            blue: newArr,
                            update: {},
                        }
                    default:
                        return state
                }
            }
        case MOVE_UPDATE:
            return {
                ...state,
                update: action.payload,
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
export const getUpdatePos = (state) => state.move.update

// action types
export const ARRAY = 'array'
export const MOVE = 'move'
export const MOVE_UPDATE = 'move update recieved'
export const UPDATE_POS = 'update piece pos'

// action creators
export const update_arr = ({ color, index, new_pos }) => ({
    type: ARRAY,
    payload: { color, index, new_pos },
})
export const move_piece = ({ dice, position, gameId, index, pieceId }) => ({
    type: MOVE,
    payload: { dice, position, gameId, index, pieceId },
})
export const update_recieved = ({
    color,
    posArr,
    new_pos,
    index,
    pieceId,
}) => ({
    type: MOVE_UPDATE,
    payload: { color, posArr, new_pos, index, pieceId },
})
export const update_piece_pos = () => ({
    type: UPDATE_POS,
})
