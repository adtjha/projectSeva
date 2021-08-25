const initialState = {
    face: 1,
    rolled: false,
    showing: true,
    otherPlayerRoll: false,
}

export function diceReducer(state = initialState, action) {
    switch (action.type) {
        case ROLL:
            return { ...state, face: action.payload }
        case ROLLED:
            return { ...state, rolled: action.payload }
        case SHOWING:
            return { ...state, showing: action.payload }
        default:
            return state
    }
}

// selectors
export const getDice = (state) => state.dice.face
export const rolled = (state) => state.dice.rolled
export const getShowing = (state) => state.dice.showing

// action types
export const ROLL = 'roll'
export const ROLLED = 'rolled'
export const SHOWING = 'showing'
export const FETCH_DICE = 'fetch_dice'

// action creators
export const set_dice = (n) => ({
    type: ROLL,
    payload: n,
})
export const set_rolled = (state) => ({
    type: ROLLED,
    payload: state,
})
export const set_showing = (state) => ({
    type: SHOWING,
    payload: state,
})
export const fetch_dice = () => ({
    type: FETCH_DICE,
})