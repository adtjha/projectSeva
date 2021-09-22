import { useDispatch, useSelector } from 'react-redux'
import Cell from './Cell'
import create2Darray from './functions/create2Darray'
import { VideoChat } from './videoChat'
import Dice from './Dice'
import React, { useEffect, useRef } from 'react'
import { getBlue, getGreen, getRed, getYellow } from '../store/move'
import { getDice } from '../store/dice'
import { getGameId } from '../store/user'
import { Notification } from './Notification'
// import { useLogger } from 'react-use'
// import { useGeolocation } from "react-use";

const Board = (props) => {
    const mounted = useRef(true)
    const dispatch = useDispatch()

    const data = {
        red: useSelector(getRed),
        green: useSelector(getGreen),
        yellow: useSelector(getYellow),
        blue: useSelector(getBlue),
        dice: useSelector(getDice),
    }
    const pos = [...create2Darray(data)]
    const gameId = useSelector(getGameId)

    useEffect(() => {
        return () => {
            mounted.current = false
        }
    }, [dispatch, gameId, mounted])

    return (
        <React.Fragment>
            <Notification message="Game Started." />
            <div className="w-auto p-2 text-2xl font-semibold text-black mx-auto my-4">
                Room UID : {gameId}
            </div>
            <div className="board block w-107 h-107 transform scale-95 -mx-2 min-w-max min-h-max lg:w-157 lg:h-157 lg:p-4 lg:m-auto p-1 border-2 border-solid rounded-2xl shadow-md">
                <div className="relative z-20 w-104 h-104 min-w-max min-h-max lg:w-148 lg:h-148 grid grid-cols-sm15 grid-rows-sm15 gap-1 lg:grid-cols-15 lg:grid-rows-15 lg:gap-2 justify-items-stretch">
                    {pos.map((cell) => (
                        <Cell key={cell.id} data={cell} />
                    ))}
                    <VideoChat />
                </div>
            </div>
            <Dice num={data.dice} />
        </React.Fragment>
    )
}

export default Board
