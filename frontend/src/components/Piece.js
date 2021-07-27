import React from 'react'
import red from '../images/red.svg'
import green from '../images/green.svg'
import yellow from '../images/yellow.svg'
import blue from '../images/blue.svg'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import Constants from './Constants'
import { move_piece } from '../store/move'
import {
    getColor,
    getChance,
    getPieceOut,
    set_piece_out,
    set_chance,
} from '../store/user'
import { getDice, rolled, set_rolled } from '../store/dice'

function Piece(props) {
    const letter = props.name
    const color = Constants.colorNames[letter.split('')[0]]
    const num = props.name.split('')[1]
    const patharr = Constants[color.toUpperCase() + '_PATH']
    var className, piece, newPos

    const position = useSelector((state) => state.move[color][num - 1])
    const dice = useSelector(getDice)
    const userColor = useSelector(getColor)
    const isChance = useSelector(getChance)
    const hasRolled = useSelector(rolled)
    const isPieceOut = useSelector(getPieceOut)

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

    const animate = (e) => {
        newPos = position === letter ? 1 : parseInt(position) + parseInt(dice)
        const start = Constants.xy(patharr, position),
            end = Constants.xy(patharr, newPos)
        e.currentTarget.className += Constants.generateTranslate(start, end)
    }

    const updatePosition = () => {
        if (!isPieceOut) {
            dispatch(set_piece_out(true))
        }
        setTimeout(() => {
            dispatch(move_piece(num - 1, color, dice))
            dispatch(set_rolled(false))
        }, 100)
    }

    const handleClick = (e) => {
        if (color === userColor && isChance && hasRolled) {
            console.log(props, position)
            if (props.name === position) {
                // start move, only if six
                if (dice === 6) {
                    animate(e)
                    updatePosition()
                    dispatch(set_chance(true))
                } else {
                    // chance finished
                    dispatch(set_chance(false))
                }
            } else if (props.name !== position) {
                animate(e)
                updatePosition()
                dispatch(set_chance(true))
            }
        } else {
            console.log('NOT ALLOWED')
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
