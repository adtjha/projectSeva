import { useDispatch, useSelector } from 'react-redux'
import Cell from './Cell'
import create2Darray from './functions/create2Darray'
import { VideoChat } from './videoChat'
import Dice from './Dice'
import React, { useContext, useEffect, useRef } from 'react'
import { getBlue, getGreen, getRed, getYellow } from '../store/move'
import { getDice } from '../store/dice'
import { getGameId, set_data } from '../store/user'
import { SocketContext } from '../connect/socket'
import { Notification } from './Notification'
import { useLogger } from 'react-use'
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
    const socket = useRef(useContext(SocketContext))
    const pos = [...create2Darray(data)]
    const gameId = useSelector(getGameId)
    
    useLogger('Board', mounted)
    useEffect(() => {
        socket.current.on('update_current', (player) => {
            if (mounted.current) {
                console.log('recieved', player, mounted)
                dispatch(set_data({ id: gameId, current: player }))
            }
        })

        return () => {
            mounted.current = false
        }
    }, [dispatch, gameId, mounted])

    return (
        <React.Fragment>
            <Notification message="Game Started." />
            <div className="w-max p-2 text-2xl font-semibold text-black mx-auto my-4">
                Room UID : {gameId}
            </div>
            <div className="board block lg:w-max lg:h-max lg:max-w-full  lg:p-4 m-auto p-1 border-2 border-solid rounded-2xl shadow-md">
                <div className="relative z-20 lg:w-max lg:max-w-full grid grid-cols-sm15 lg:grid-cols-15 grid-rows-sm15 lg:grid-rows-15 md:gap-1 lg:gap-2 justify-items-stretch">
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
