import { call, put, take, fork, cancel } from 'redux-saga/effects'
import { eventChannel, END } from 'redux-saga'
import {
    CONNECT,
    DISCONNECT,
    disconnect_socket,
    set_config,
    update_current,
} from 'store/user'
import { connect } from './connect'
import { FETCH_DICE, set_dice } from 'store/dice'

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
            console.log('why logging here')
            emit(set_dice(face))
        })

        socket.on('update_current', (player) => {
            emit(update_current(player))
        })

        socket.on('disconnect', () => {
            emit(disconnect_socket())
        })

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

const onRollDice = function* (socket) {
    while (true) {
        const { payload } = yield take(FETCH_DICE)
        socket.emit('roll_dice', payload)
    }
}

// Worker
const socketWorker = function* (socket) {
    yield fork(read, socket)
    yield fork(onRollDice, socket)
}

// Watcher
const socketFlow = function* (socket) {
    while (true) {
        const { payload } = yield take(CONNECT)
        const socket = yield connect()
        socket.emit('join_game', payload)

        const task = yield fork(socketWorker, socket)

        let action = yield take(DISCONNECT)
        yield cancel(task)
    }
}

export default function* rootSaga() {
    yield fork(socketFlow)
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
