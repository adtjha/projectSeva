const initialState = {
    face: 1,
    rolled: false,
    showing: true,
    otherPlayerRoll: false,
}

export function diceReducer(state = initialState, action) {
    switch (action.type) {
        case ROLL:
            console.log('store : setting dice')
            return {
                ...state,
                face: action.payload,
            }
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
export const FETCH_DICE = 'roll dice request'
export const UNROLL_DICE = 'unroll dice'

// export const ROLL_DICE_REQ = 'roll dice request'
export const ROLL_DICE_RES = 'roll dice response'

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
export const fetch_dice = ({ gameId, userId }) => ({
    type: FETCH_DICE,
    payload: { gameId, userId },
})

// export const roll_dice_req = ({ gameId }) => ({
//     type: ROLL_DICE_REQ,
//     payload: { gameId },
// })

export const roll_dice_res = ({ face }) => ({
    type: ROLL_DICE_RES,
    payload: { face },
})

export const un_roll_dice = () => ({
    type: UNROLL_DICE,
})
