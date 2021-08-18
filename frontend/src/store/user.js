const initialState = {
    color: '',
    id: '',
    name: '',
    chance: true,
    pieceOut: false,
    data: {
        id: '',
        current: '',
    },
    ended: false,
}

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case PIECE:
            return { ...state, pieceOut: action.payload }
        case CHANCE:
            return { ...state, chance: action.payload }
        case NAME:
            return {
                ...state,
                name: action.payload.name,
                id: action.payload.id,
                color: action.payload.color,
            }
        case DATASET:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

// selectors
export const getColor = (state) => state.user.color
export const getName = (state) => state.user.name
export const getChance = (state) => state.user.chance
export const getPieceOut = (state) => state.user.pieceOut
export const getUserId = (state) => state.user.id
export const getGameId = (state) => state.user.data.id
export const getGameStatus = (state) => state.user.ended
export const getGameCurrentPlayer = (state) => state.user.data.current

// action types
export const PIECE = 'piece'
export const CHANCE = 'chance'
export const NAME = 'name'
export const DATASET = 'data'

// action creators
export const set_piece_out = (state) => ({
    type: PIECE,
    payload: state,
})
export const set_chance = (state) => ({
    type: CHANCE,
    payload: state,
})
export const set_name = ({ id, name, color }) => ({
    type: NAME,
    payload: {
        id: id,
        name: name,
        color: color,
    },
})
export const set_data = ({ id, current }) => ({
    type: DATASET,
    payload: {
        id: id,
        current: current,
    },
})
