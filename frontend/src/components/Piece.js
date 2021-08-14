import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react'
import red from '../images/red.svg'
import green from '../images/green.svg'
import yellow from '../images/yellow.svg'
import blue from '../images/blue.svg'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Constants from '../Constants'
import { move_piece } from '../store/move'
import {
    getColor,
    getChance,
    getPieceOut,
    set_piece_out,
    set_chance,
} from '../store/user'
import { getDice, rolled, set_rolled } from '../store/dice'
import { SocketContext } from 'connect/socket'

function Piece(props) {
    const name = props.name
    const letter = props.name.split('')[0]
    const num = props.name.split('')[1]

    const color = Constants.colorNames[letter]
    const patharr = Constants[color.toUpperCase() + '_PATH']

    var className, piece

    const position = useSelector((state) => state.move[color][num - 1])
    const dice = useSelector(getDice)
    const userColor = useSelector(getColor)
    const isChance = useSelector(getChance)
    const hasRolled = useSelector(rolled)
    const isPieceOut = useSelector(getPieceOut)

    const socket = useContext(SocketContext)

    const dispatch = useDispatch()

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
        (pos) => {
            // animate
            const start = Constants.xy(patharr, position),
                end = Constants.xy(
                    patharr,
                    parseInt(isNaN(pos) ? 1 : position - pos)
                )
            className += Constants.generateTranslate(start, end)
            setTimeout(() => {
                dispatch(move_piece(pos, color, num - 1))
                console.log('dispatched')
            }, 500)
        },
        [color, dispatch, num, patharr, position, className]
    )

    useLayoutEffect(() => {
        // socket.on pos -> update pos
        socket.on('piece_moved', ({ toMove, color, pieceID }) => {
            if (pieceID === name) {
                updatePos(toMove)
            }
        })
    }, [socket, name, updatePos])

    const handleClick = (e) => {
        e.preventDefault()
        if (color === userColor && isChance && hasRolled) {
            // console.log(props, position, pieceRef.current.className)
            if (props.name === position) {
                // logic -> move only if pieceOut else move only if dice is 6
                if (dice === 6 && !isPieceOut) {
                    dispatch(set_piece_out(true))
                    dispatch(set_rolled(false))
                    dispatch(set_chance(true))
                    updatePos(1)
                    // socket.emit pos
                    socket.emit('move_piece', {
                        toMove: isNaN(position) ? 1 : position + 1,
                        color,
                        name,
                    })
                } else {
                    // chance finished
                    dispatch(set_chance(false))
                }
            } else if (props.name !== position) {
                dispatch(set_rolled(false))
                dispatch(set_chance(true))
                updatePos(dice)
                // socket.emit pos
                socket.emit('move_piece', {
                    toMove: position + dice,
                    color,
                    name,
                })
            }
        } else {
            console.log('NOT ALLOWED')
            dispatch(set_rolled(false))
        }
    }

    return (
        <React.Fragment>
            <img
                className={className}
                data={props.name}
                src={piece || color}
                alt={props.name}
                onClick={handleClick}
            ></img>
        </React.Fragment>
    )
}

export default Piece
