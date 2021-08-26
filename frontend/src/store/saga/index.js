import { call, put, take, all, fork, takeLatest } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import { CONNECT, set_config } from 'store/user'
import { connect } from './connect'
import { FETCH_DICE, set_dice, set_showing } from 'store/dice'

const suscribe = (socket) => {
    return eventChannel((emit) => {
        socket.on('config_data', (data) => {
            emit(
                set_config({
                    id: data.user.id,
                    game_id: data.id,
                    current: data.current,
                    color: data.user.color,
                })
            )
        })

        socket.on('dice_rolled', ({ face }) => {
            emit(set_dice(face))
        })

        socket.on('disconnect', () => emit(END))

        return () => {
            emit(END)
        }
    })
}

function* read(socket) {
    const channel = yield call(suscribe, socket)
    while (true) {
        const data = yield take(channel)
        yield put(data)
    }
}

// Worker
const connectSocket = function* (socket, action) {
    yield socket.emit('join_game', action.payload)
    yield fork(read, socket)
}

const onRollDice = function* (socket, action) {
    yield socket.emit('roll_dice', action.payload)
    yield fork(read, socket)
}

// Watcher
const connectSocketWatcher = function* (socket) {
    yield takeLatest(CONNECT, connectSocket, socket)
}

const onRollDiceWatcher = function* (socket) {
    yield takeLatest(FETCH_DICE, onRollDice, socket)
}

export default function* rootSaga() {
    const socket = yield connect()
    yield all([
        fork(connectSocketWatcher, socket),
        fork(onRollDiceWatcher, socket),
    ])
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
