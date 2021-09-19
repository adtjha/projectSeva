const initialState = {
    color: '',
    id: '',
    game_id: '',
    current: '',
    ended: false,
    alert: '',
}

export function usersReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CONFIG:
            return {
                ...state,
                id: action.payload.id,
                color: action.payload.color,
                game_id: action.payload.game_id,
                current: action.payload.current,
            }
        case UPDATE:
            return { ...state, current: action.payload.current }
        case ALERT:
            return { ...state, alert: action.payload }
        default:
            return state
    }
}

// selectors
export const getColor = (state) => state.user.color
export const getUserId = (state) => state.user.id
export const getGameId = (state) => state.user.game_id
export const getGameStatus = (state) => state.user.ended
export const getGameCurrentPlayer = (state) => state.user.current

// action types
export const PIECE = 'piece'
export const CHANCE = 'chance'
export const SET_CONFIG = 'set config'
export const UPDATE = 'update'
export const CONNECT = 'connect'
export const DISCONNECT = 'disconnect'
export const CONFIG = 'config'
export const NEXT = 'next'
export const ALERT = 'alert'

// action creators
export const set_piece_out = (state) => ({
    type: PIECE,
    payload: state,
})
export const set_config = ({ id, color, game_id, current }) => ({
    type: SET_CONFIG,
    payload: {
        id,
        color,
        game_id,
        current,
    },
})
export const update_current = ({ current }) => ({
    type: UPDATE,
    payload: { current },
})
export const connect_socket = (room) => ({
    type: CONNECT,
    payload: room,
})
export const disconnect_socket = () => ({
    type: DISCONNECT,
})
export const set_config_request = () => ({
    type: CONFIG,
})
export const next_player = () => ({
    type: NEXT,
})
export const alert_player = () => ({
    type: ALERT,
    
})
