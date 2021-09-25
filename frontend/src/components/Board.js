import { useDispatch, useSelector } from 'react-redux'
import Cell from './Cell'
import create2Darray from './functions/create2Darray'
import { VideoChat } from './videoChat'
import Dice from './Dice'
import React, { useEffect, useRef } from 'react'
import { getBlue, getGreen, getRed, getYellow } from '../store/move'
import { getDice } from '../store/dice'
import { getGameId, getGameStatus } from '../store/user'
import { Notification } from './Notification'
import Constants from 'Constants'

const Board = (props) => {
    const mounted = useRef(true)
    const dispatch = useDispatch()

    const hasGameEnded = useSelector(getGameStatus)

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

    const handleShare = () => {
        const link = `${Constants.WEB_APP_URL}/game/${gameId}`
        const shareData = {
            title: 'Dedo',
            text: 'Play and Donate money to Charity. Join the game using this link. \n',
            url: new URL(link),
        }
        if (!navigator.canShare) {
            navigator.clipboard.writeText(link).then(
                () => {
                    console.log('Saved to Clipboard')
                },
                () => {
                    console.log('Unable to save to Clipboard')
                }
            )
        } else {
            navigator.share(shareData)
        }
    }

    return (
        <React.Fragment>
            <Notification message="Game Started." />
            <div
                className="hover:rounded-lg hover:shadow-md hover:cursor-pointer w-max z-0 p-2 text-2xl font-semibold text-black mx-auto my-4 flex flex-row content-evenly items-center"
                onClick={handleShare}
            >
                <div className="flex flex-col w-auto content-evenly items-center">
                    <span className="w-max text-sm tracking-widest font-normal opacity-80">
                        ROOM UID
                    </span>
                    <span className="w-max">{gameId}</span>
                </div>
                <div className="w-7 opacity-60 mx-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        classname="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                    </svg>
                </div>
            </div>

            <div className="board z-0 block w-107 h-107 transform scale-95 -mx-2 sm:m-auto min-w-max min-h-max lg:w-157 lg:h-157 lg:p-4 p-1 border-2 border-solid rounded-2xl shadow-md">
                <div className="relative z-20 w-104 h-104 min-w-max min-h-max lg:w-148 lg:h-148 grid grid-cols-sm15 grid-rows-sm15 gap-1 lg:grid-cols-15 lg:grid-rows-15 lg:gap-2 justify-items-stretch">
                    {pos.map((cell) => (
                        <Cell key={cell.id} data={cell} />
                    ))}
                    <VideoChat />
                </div>
            </div>
            <Dice num={data.dice} />
            {hasGameEnded ? (
                <React.Fragment>
                    <div
                        className="bg-blueGray-900 opacity-40 fixed inset-0 z-10"
                        style={{
                            height: '100vh',
                            width: '100vw',
                        }}
                        onClick={() => console.log('GAME OVER')}
                    ></div>
                    <div class="w-104 h-104 z-20 fixed inset-0 m-auto p-4 shadow-2xl rounded-2xl bg-blueGray-50">
                        <div className="text-center font-normal text-2xl tracking-widest">
                            GAME END : WINNERS
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                ' '
            )}
        </React.Fragment>
    )
}

export default Board
