const initialState = {
    color: 'red',
    id: '',
    name: '',
    chance: true,
    pieceOut: false,
}
// const initialState = {
//     color: 'red',
//     id: '3b94f841-6825-41dd-9f74-355e682dd26e',
//     name: 'aditya',
//     chance: true,
//     pieceOut: false,
// }

/**
 * reducer for user state, which includes,
 * - color => color of player's home square
 * - id => id of the player
 * - name => name of the player
 * - chance => boolean if it is player's chance
 * - pieceOut => boolean for if player's piece is out
 */

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case PIECE:
            return { ...state, pieceOut: action.payload }
        case CHANCE:
            return { ...state, chance: action.payload }
        default:
            return state
    }
}

// selectors
export const getColor = (state) => state.user.color
export const getName = (state) => state.user.name
export const getChance = (state) => state.user.chance
export const getPieceOut = (state) => state.user.pieceOut

// action types
export const PIECE = 'piece'
export const CHANCE = 'chance'

// action creators
export const set_piece_out = (state) => ({
    type: PIECE,
    payload: state,
})
export const set_chance = (state) => ({
    type: CHANCE,
    payload: state,
})
