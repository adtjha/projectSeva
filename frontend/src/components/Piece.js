import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { useLogger, useMedia, useRendersCount } from 'react-use'
import red from '../images/red.svg'
import green from '../images/green.svg'
import yellow from '../images/yellow.svg'
import blue from '../images/blue.svg'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Constants from '../Constants'
import { move_piece, update_piece_pos } from '../store/move'
import { getColor, getGameId, getGameCurrentPlayer } from '../store/user'
import { getDice, rolled } from '../store/dice'
import { useState } from 'react'

function Piece(props) {
    const name = props.name
    const letter = props.name.split('')[0]
    const num = props.name.split('')[1]

    const color = Constants.colorNames[letter]
    const patharr = Constants[color.toUpperCase() + '_PATH']
    const [animate, reset] = useState('')
    const isLg = useMedia('(min-width: 1024px)')

    var className, piece
    const position = useSelector((state) => state.move[color][num - 1])
    const update = useSelector((state) => state.move.update)
    const dice = useSelector(getDice)
    const userColor = useSelector(getColor)
    const currentColor = useSelector(getGameCurrentPlayer)
    const hasRolled = useSelector(rolled)
    const gameId = useSelector(getGameId)

    // const socket = useRef(useContext(SocketContext))

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
        (pos) => {
            // animate
            const start = Constants.xy(patharr, position),
                end = Constants.xy(patharr, pos)
            return Constants.generateTranslate(start, end, isLg)
        },
        [patharr, position, isLg]
    )

    useLayoutEffect(() => {
        if (update.pieceId === name) {
            console.info('piece ID matched ')
            reset(updatePos(update.new_pos))
            setTimeout(() => {
                console.log('updating piece position')
                dispatch(update_piece_pos())
            }, 300)
            return () => {
                reset('')
            }
        }
    }, [updatePos, update, name, dispatch])

    const handleClick = (e) => {
        e.preventDefault()
        if (color === userColor && isChance && hasRolled) {
            dispatch(
                move_piece({
                    dice,
                    position,
                    gameId,
                    index: num - 1,
                    pieceId: name,
                })
            )
        } else {
            console.log('NOT ALLOWED', userColor, isChance, hasRolled)
        }
    }

    // useLogger('Piece', useRendersCount(), name, animate, className)

    return (
        <React.Fragment>
            <img
                className={className + ' ' + animate}
                data={props.name}
                src={piece || color}
                alt={props.name}
                onClick={handleClick}
            ></img>
        </React.Fragment>
    )
}

export default Piece
