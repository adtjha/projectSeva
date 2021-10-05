import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useEffectOnce } from 'react-use'
import { connect_socket, getGameId } from 'store/user'
import Board from './Board'
import { guid } from './functions/guid'
import { randomGender } from './functions/randomGender'

export const Game = () => {
    const dispatch = useDispatch()
    const [room, setRoom] = useState('')
    const { id } = useParams()

    useEffectOnce(() => {
        console.log(id)
        if (id !== undefined) {
            dispatch(connect_socket(id))
        } else {
            const uid = guid()
            setRoom(uid)
        }
    })

    const handleSubmit = () => dispatch(connect_socket(room))

    const gameId = useSelector(getGameId)

    return gameId ? (
        <Board />
    ) : (
        <React.Fragment>
            <div
                className=" flex flex-col content-center"
                style={{ width: '100vw', height: '100vh', margin: 'auto' }}
            >
                <div className="w-5/6 h-16 items-center justify-end my-4 mx-auto flex flex-row">
                    <div className="w-max h-max justify-center items-center flex flex-row">
                        <div className="flex flex-col mr-2 items-center text-center text-blueGray-800">
                            <div className="text-xs font-normal opacity-80" style={{letterSpacing: '0.25em'}}>PLAYERS</div>
                            <div className="text-lg font-bold ">98,76,54,321</div>
                        </div>
                    </div>
                    <div className="w-16 h-16 flex flex-row">
                        <img
                            className="w-12 h-12 m-auto rounded-full shadow-2xl border-2 border-blueGray-800"
                            src={`https://avatars.dicebear.com/api/${randomGender()}/${guid()}.svg?background=%23F1F5F9`}
                            alt="avatar"
                        />
                    </div>
                </div>
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


