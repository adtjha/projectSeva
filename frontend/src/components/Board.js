import { useDispatch, useSelector } from 'react-redux'
import Cell from './Cell'
import create2Darray from './functions/create2Darray'
import { VideoChat } from './videoChat'
import Dice from './Dice'
import React, { useContext } from 'react'
import { getBlue, getGreen, getRed, getYellow } from '../store/move'
import { getDice } from '../store/dice'
import { getGameId, getGameStatus, set_data, set_name } from '../store/user'
import { SocketContext } from '../connect/socket'
// import { useGeolocation } from "react-use";

const Board = (props) => {
    const data = {
        red: useSelector(getRed),
        green: useSelector(getGreen),
        yellow: useSelector(getYellow),
        blue: useSelector(getBlue),
        dice: useSelector(getDice),
    }

    const dispatch = useDispatch()
    const socket = useContext(SocketContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        socket.emit('join_game', e.target[0].value)
        socket.on('config_data', (data) => {
            console.log(e.target[0].value, socket)
            dispatch(set_data({ id: data.id, current: data.current }))
            dispatch(
                set_name({
                    id: data.user.id,
                    name: e.target[0].value,
                    color: data.user.color,
                })
            )
        })
    }

    const gameId = useSelector(getGameId)
    const hasGameEnded = useSelector(getGameStatus)

    const pos = [...create2Darray(data)]

    return !hasGameEnded && gameId ? (
        <React.Fragment>
            <div className="board block lg:w-max lg:h-max lg:max-w-full  lg:p-4 m-auto p-1 border-2 border-solid rounded-2xl shadow-md">
                <div className="relative z-20 lg:w-max lg:max-w-full grid grid-cols-sm13 lg:grid-cols-13 grid-rows-sm13 lg:grid-rows-13 md:gap-1 lg:gap-2 justify-items-stretch">
                    {pos.map((cell) => (
                        <Cell key={cell.id} data={cell} />
                    ))}
                    <VideoChat />
                </div>
            </div>
            <Dice num={data.dice} />
        </React.Fragment>
    ) : (
        <React.Fragment>
            <div className="w-full h-96 flex">
                <div className="w-max h-max m-auto p-4 border-2 border-gray-400 flex flex-col">
                    <h1 className="font-semibold m-auto py-4">USER NAME</h1>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <input className="p-2 text-center"></input>
                        <button
                            type="submit"
                            className="my-4 mx-auto w-36 h-12 bg-blueGray-800 text-blueGray-200 py-2 px-2 rounded"
                        >
                            Play
                        </button>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Board
