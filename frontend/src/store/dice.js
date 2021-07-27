const initialState = {
    face: 1,
    rolled: false,
    showing: true,
}

export function diceReducer(state = initialState, action) {
    switch (action.type) {
        case ROLL:
            console.log('here', state, action.payload )
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

// action creators
export const set_dice = () => ({
    type: ROLL,
    payload: Math.ceil(Math.random() * 6),
})
export const set_rolled = (state) => ({
    type: ROLLED,
    payload: state,
})
export const set_showing = (state) => ({
    type: SHOWING,
    payload: state,
})
