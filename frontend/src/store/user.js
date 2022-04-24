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
    params: {
        encodings: [
            {
                rid: 'r0',
                maxBitrate: 100000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r1',
                maxBitrate: 300000,
                scalabilityMode: 'S1T3',
            },
            {
                rid: 'r2',
                maxBitrate: 900000,
                scalabilityMode: 'S1T3',
            },
        ],
        codecOptions: {
            videoGoogleStartBitrate: 1000,
        },
    },
    rtpCapabilities: {},
    device: {},
    producerTransport: {},
    consumerTransports: [],
    producer: {},
    consumer: {},
    isProducer: false,
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
                rtpCapabilities: action.payload.rtpCapabilities,
            }
        case UPDATE:
            return { ...state, current: action.payload.current }
        case GAME_END:
            return {
                ...state,
                ended: action.payload.end,
                winners: [...action.payload.winners],
            }
        case USER_LOGIN:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                uid: action.payload.uid,
                photoURL: action.payload.photoURL,
            }
        case SET_DEVICE:
            return {
                ...state,
                device: action.payload,
            }
        case SET_PARAMS:
            console.log({
                ...state,
                params: { ...action.payload, ...state.params },
            })
            return {
                ...state,
                params: { ...action.payload, ...state.params },
            }
        default:
            return state
    }
}

// selectors
export const getColor = (state) => state.user.color
export const getUserId = (state) => state.user.uid
export const getGameId = (state) => state.user.game_id
export const getGameStatus = (state) => state.user.ended
export const getGameCurrentPlayer = (state) => state.user.current
export const getRtpCapabilities = (state) => state.user.rtpCapabilities
export const getDevice = (state) => state.user.device
export const getParams = (state) => state.user.params

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
export const SET_DEVICE = 'set device'
export const SET_PARAMS = 'set params'
export const CREATE_SEND_TRANSPORT = 'creating send transport'
export const CONNECT_SEND_TRANSPORT = 'connect send transport'

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
export const create_device = (device) => ({
    type: SET_DEVICE,
    payload: { ...device },
})
export const update_params = ({ track }) => ({
    type: SET_PARAMS,
    payload: { track },
})
export const createSendTransportAction = (data) => ({
    type: CREATE_SEND_TRANSPORT,
    payload: { ...data },
})
export const connectSendTransportAction = () => ({
    type: CONNECT_SEND_TRANSPORT,
})
