import React, { useCallback, useContext, useLayoutEffect, useRef } from 'react'
import { useMedia } from 'react-use'
import red from '../images/red.svg'
import green from '../images/green.svg'
import yellow from '../images/yellow.svg'
import blue from '../images/blue.svg'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Constants from '../Constants'
import { update_arr } from '../store/move'
import {
    getColor,
    getGameId,
    getUserId,
    getGameCurrentPlayer,
} from '../store/user'
import { getDice, rolled, set_rolled } from '../store/dice'
import { SocketContext } from 'connect/socket'

function Piece(props) {
    const mounted = useRef(true)
    const name = props.name
    const letter = props.name.split('')[0]
    const num = props.name.split('')[1]

    const color = Constants.colorNames[letter]
    const patharr = Constants[color.toUpperCase() + '_PATH']
    const animate = useRef()
    const isLg = useMedia('(min-width: 1024px)')

    var className, piece

    const position = useSelector((state) => state.move[color][num - 1])
    const dice = useSelector(getDice)
    const userColor = useSelector(getColor)
    const userId = useSelector(getUserId)
    const currentColor = useSelector(getGameCurrentPlayer)
    const hasRolled = useSelector(rolled)
    const gameId = useSelector(getGameId)

    const socket = useRef(useContext(SocketContext))

    const dispatch = useDispatch()
    const isChance = userColor === currentColor

    if (letter.includes('r')) {
        piece = red
    } else if (letter.includes('g')) {
        piece = green
    } else if (letter.includes('y')) {
        piece = yellow
    } else {
        piece = blue
    }

    if (_.inRange(props.multiple, 1, 2)) {
        className = 'w-3 h-3 lg:w-4 lg:h-4'
    } else if (_.inRange(props.multiple, 2, 4)) {
        className = 'w-2 h-2 lg:w-3 lg:h-3'
    } else if (_.inRange(props.multiple, 4, 6)) {
        className = 'w-1 h-1 lg:w-2 lg:h-2'
    }

    const updatePos = useCallback(
        (posArr, pos) => {
            // animate
            const start = Constants.xy(patharr, position),
                end = Constants.xy(patharr, pos)
            animate.current = Constants.generateTranslate(start, end, isLg)
            console.log(animate.current, { start, end, position, pos })
            setTimeout(() => {
                dispatch(update_arr(color, posArr))
                console.log('dispatched')
            }, 150)
        },
        [color, dispatch, patharr, position, animate, isLg]
    )

    useLayoutEffect(() => {
        // socket.on pos -> update pos
        socket.current.on('piece_moved', ({ posArr, new_pos, pieceID }) => {
            if (pieceID === name && mounted.current) {
                console.log(posArr)
                const pos = new_pos
                updatePos(posArr, pos)
            }
        })

        socket.current.on('moved_piece_err', ({ message }) => {
            alert(message)
        })

        return () => {
            animate.current = ''
            mounted.current = false
        }
    }, [dispatch, gameId, name, updatePos])

    const handleClick = (e) => {
        e.preventDefault()
        if (color === userColor && isChance && hasRolled) {
            dispatch(set_rolled(false))
            socket.current.emit('move_piece', {
                name,
                dice,
                position,
                gameId,
                safe_cell: props.cell_data.safe,
            })
            if (dice !== 6) {
                socket.current.emit('change', { game_id: gameId })
            }
        } else {
            console.log('NOT ALLOWED', userColor, isChance, hasRolled)
        }
    }

    return (
        <React.Fragment>
            <img
                className={className + ' ' + animate.current}
                data={props.name}
                src={piece || color}
                alt={props.name}
                onClick={handleClick}
            ></img>
        </React.Fragment>
    )
}

export default Piece
