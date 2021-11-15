const initialState = {
    name: '',
    email: '',
    uid: '',
    photoURL: '',
    color: '',
    id: '',
    game_id: '',
    current: '',
    ended: false,
    winners: [],
    alert: {},
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
        case GAME_END:
            return {
                ...state,
                ended: action.payload.end,
                winners: [...action.payload.winners],
            }
        case 'USER_LOGIN':
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                uid: action.payload.uid,
                photoURL: action.payload.photoURL,
            }
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
export const NEXT = 'next'
export const GAME_END = 'game ended'
export const USER_LOGIN = 'user logged in'

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
export const connect_socket = ({ roomId, channelId, userId }) => ({
    type: CONNECT,
    payload: { roomId, channelId, userId },
})
export const disconnect_socket = () => ({
    type: DISCONNECT,
})
export const next_player = () => ({
    type: NEXT,
})
export const game_end = () => ({
    type: GAME_END,
})
export const login = ({ name, email, uid, photoURL }) => ({
    type: USER_LOGIN,
    payload: {
        name,
        email,
        uid,
        photoURL,
    },
})
