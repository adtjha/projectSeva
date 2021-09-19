
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    connect_socket,
    getGameId,
    getGameStatus,
} from 'store/user'
import Board from './Board'
import { GUID } from './functions/randomUid'

export const Game = () => {
    const dispatch = useDispatch()
    const [room, setRoom] = useState('')

    useEffect(() => {
        setRoom(GUID)
    }, [setRoom])

    const handleSubmit = () => dispatch(connect_socket(room))

    const gameId = useSelector(getGameId)
    const hasGameEnded = useSelector(getGameStatus)

    return !hasGameEnded && gameId ? (
        <Board />
    ) : (
        <React.Fragment>
            <div
                className=" flex flex-col content-center"
                style={{ width: '100vw', height: '100vh', margin: 'auto' }}
            >
                <div className="w-max h-max m-auto p-4 flex flex-col shadow-2xl rounded-2xl bg-blueGray-400">
                    <h1 className="font-semibold m-auto py-4">
                        Type Room ID below 👇
                    </h1>
                    <div className="flex flex-col">
                        <input
                            className="mx-8 p-2 text-center rounded-2xl"
                            placeholder={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="my-6 mx-auto w-36 h-12 bg-blueGray-800 text-blueGray-200 py-2 px-2 rounded"
                            onClick={handleSubmit}
                        >
                            Join Room
                        </button>
                    </div>
                </div>
                <div className="w-full text-center text-4xl opacity-20">
                    - OR -
                </div>
                <div className="w-max h-max m-auto p-4 flex flex-col">
                    <button
                        type="submit"
                        className="m-auto w-36 h-12 bg-blueGray-800 text-blueGray-200 py-2 px-2 rounded"
                        onClick={handleSubmit}
                    >
                        Play Random
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}
