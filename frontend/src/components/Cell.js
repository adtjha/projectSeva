import React from 'react'
import Piece from './Piece'
import { getColor, getGameId, getGameCurrentPlayer } from '../store/user'
import { getDice, rolled } from '../store/dice'
import Constants from '../Constants'
import { useDispatch, useSelector } from 'react-redux'
import { move_piece } from 'store/move'

const Cell = (props) => {
    let styles, piece
    styles = props.data.style

    const currentColor = useSelector(getGameCurrentPlayer)
    const hasRolled = useSelector(rolled)
    const dispatch = useDispatch()
    const userColor = useSelector(getColor)
    const dice = useSelector(getDice)
    const gameId = useSelector(getGameId)
    const move = useSelector((state) => state.move)
    const isChance = userColor === currentColor

    if (props.data.has) {
        if (props.data.has.length > 1) {
            piece = props.data.has.map((e) => {
                return (
                    <Piece
                        key={e}
                        cell_data={props.data}
                        name={e}
                        size={0}
                        multiple={props.data.has.length}
                    />
                )
            })
        } else {
            piece = props.data.has.map((e) => {
                return (
                    <Piece
                        key={e}
                        cell_data={props.data}
                        name={e}
                        size={0}
                        multiple={1}
                    />
                )
            })
        }
        styles += ' flex justify-center items-center flex-wrap '
    }
    if (styles) {
        Constants.cellsNotToDraw.forEach((e) => {
            if (props.data.id === e) {
                styles = undefined
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        let pieces = props.data.has,
            pieceToMove
        pieces = pieces.filter(
            (p) => p.split('')[0] === currentColor.split('')[0]
        )
        pieceToMove = pieces[~~(pieces.length * Math.random())]

        const color = Constants.colorNames[pieceToMove.split('')[0]]
        const num = pieceToMove.split('')[1]

        if (color === userColor && isChance && hasRolled) {
            dispatch(
                move_piece({
                    dice,
                    position: move[color][num - 1],
                    gameId,
                    index: num - 1,
                    pieceId: pieceToMove,
                })
            )
        } else {
            console.log('NOT ALLOWED', userColor, isChance, hasRolled)
        }
    }

    return (
        <React.Fragment>
            {styles ? (
                <div className={styles} onClick={handleClick}>
                    {piece}
                </div>
            ) : null}
        </React.Fragment>
    )
}

export default Cell
