const initialState = {
    data: {
        id: '',
        current: '',
    },
    ended: false,
}

// reducers
export function gameReducer(state = initialState, action) {
    switch (action.type) {
        case DATASET:
            return { ...state, data: action.payload }
        default:
            return state
    }
}

// selectors
export const getGameId = (state) => state.game.data.id
export const getGameStatus = (state) => state.game.ended

// action types
export const DATASET = 'data'

// action creators
export const set_data = (state) => ({
    type: DATASET,
    payload: state,
})
