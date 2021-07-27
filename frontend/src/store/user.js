const initialState = {
    color: 'red',
    id: '3b94f841-6825-41dd-9f74-355e682dd26e',
    name: 'aditya',
    chance: true,
    pieceOut: false,
}

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
