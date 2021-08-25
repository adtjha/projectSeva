import { call, put, take, all, fork } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { connect_socket, set_data, set_name } from 'store/user'
import { GUID } from 'components/functions/randomUid'
import { connect } from './connect'

const suscribe = (socket) => {
    return eventChannel((emit) => {
        socket.on('config_data', (data) => {
            emit(data)
        })

        return () => {
            emit(END)
        }
    })
}

// Worker
const connectSocket = function* (payload) {
    const socket = yield connect()
    yield socket.emit('join_game', payload)
    const channel = yield call(suscribe, socket)
    while (true) {
        const data = yield take(channel)
        yield put(set_data({ id: data.id, current: data.current }))
        const name = yield GUID()
        yield put(
            set_name({
                id: data.user.id,
                name,
                color: data.user.color,
            })
        )
    }
}

// Watcher
const connectSocketWatcher = function* () {
    const { payload } = yield take(connect_socket)
    yield fork(connectSocket, payload)
}

export default function* rootSaga() {
    yield all([connectSocketWatcher()])
}

/**
game.js

--------------------------------------------------------------------------------
    socket.current.emit('join_game', room)
    socket.current.on('config_data', (data) => {
            console.log(room, socket.current)
            dispatch(set_data({ id: data.id, current: data.current }))
            dispatch(
                set_name({
                    id: data.user.id,
                    name: GUID,
                    color: data.user.color,
                })
                )
            })
            
--------------------------------------------------------------------------------
    socket.current.on('update_current', (player) => {
        if (mounted.current) {
            dispatch(set_data({ id: gameId, current: player }))
        }
    })

--------------------------------------------------------------------------------
    
    // socket.on pos -> update pos
    socket.current.on('piece_moved', ({ posArr, new_pos, pieceID }) => {
        if (pieceID === name && mounted.current) {
            const pos = new_pos
            updatePos(posArr, pos)
        }
    })

--------------------------------------------------------------------------------
    
    socket.current.on('moved_piece_err', ({ message }) => {
        alert(message)
    })

--------------------------------------------------------------------------------
    
    socket.current.emit('move_piece', {
        name,
        dice,
        position,
        gameId,
        safe_cell: props.cell_data.safe,
        index: num - 1,
    })
    if (dice !== 6) {
        socket.current.emit('change', { game_id: gameId })
    }

--------------------------------------------------------------------------------

    socket.current.on('dice_rolled', ({ face, noPieceOut }) => {
        dispatch(set_dice(face))
        dispatch(set_showing(true))
        if (noPieceOut === 0 && face !== 6) {
            dispatch(set_rolled(false))
            socket.current.emit('change', { game_id: gameId })
        } else if (noPieceOut === 1) {
            console.log('Single Piece Out, Auto Moving')
            socket.current.emit('auto_move', { gameId, face })
            dispatch(set_rolled(false))
        }
    })
    
     */
