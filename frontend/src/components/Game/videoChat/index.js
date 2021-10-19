import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getGameCurrentPlayer } from '../../../store/user'

export const VideoChat = () => {
    const [current, setCurrent] = useState('')

    const currentPlayer = useSelector(getGameCurrentPlayer)

    const redClassName =
        'col-start-1 col-end-7 row-start-1 row-end-6 bg-red-200 rounded-2xl overflow-hidden shadow-md border-2 border-double border-red-400'
    const greenClassName =
        'col-start-11 col-end-16 row-start-1 row-end-7  bg-green-200 rounded-2xl overflow-hidden shadow-md border-2 border-double border-green-400'
    const yellowClassName =
        'col-start-1 col-end-6 row-start-10 row-end-16 bg-yellow-200 rounded-2xl overflow-hidden shadow-md border-2 border-double border-yellow-400'
    const blueClassName =
        'col-start-10 col-end-16 row-start-11 row-end-16  bg-blue-200 rounded-2xl overflow-hidden shadow-md border-2 border-double border-blue-400'

    const effect = ' animate-wiggle'

    useEffect(() => {
        setCurrent(currentPlayer)

        return () => {
            setCurrent('')
        }
    }, [setCurrent, currentPlayer])

    const iconStyle =
        'h-4 lg:h-6 w-4 lg:w-6 stroke-current text-gray-400 m-auto'

    const cellStyle =
        ' w-5 h-5 shadow-md lg:w-8 lg:h-8 lg:p-1 text-center shadow-none rounded flex justify-center items-center flex-wrap opacity-40'

    const videoIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconStyle}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
        </svg>
    )

    const voiceIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={iconStyle}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
        </svg>
    )

    return (
        <React.Fragment>
            <>
                <div
                    className={
                        current === 'red' ? redClassName + effect : redClassName
                    }
                ></div>
                <div
                    className={`col-start-1 col-end-2 row-start-6 row-end-7 p-0.5 ${cellStyle}`}
                >
                    {videoIcon}
                </div>
                <div
                    className={`col-start-6 col-end-7 row-start-6 row-end-7 ${cellStyle}`}
                >
                    {voiceIcon}
                </div>
            </>
            <>
                <div
                    className={
                        current === 'green'
                            ? greenClassName + effect
                            : greenClassName
                    }
                ></div>
                <div
                    className={`col-start-10 col-end-11 row-start-1 row-end-2 ${cellStyle}`}
                >
                    {videoIcon}
                </div>
                <div
                    className={`col-start-10 col-end-11 row-start-6 row-end-7 ${cellStyle}`}
                >
                    {voiceIcon}
                </div>
            </>
            <>
                <div
                    className={
                        current === 'yellow'
                            ? yellowClassName + effect
                            : yellowClassName
                    }
                ></div>
                <div
                    className={`col-start-6 col-end-7 row-start-10 row-end-11 ${cellStyle}`}
                >
                    {videoIcon}
                </div>
                <div
                    className={`col-start-6 col-end-7 row-start-15 row-end-16 ${cellStyle}`}
                >
                    {voiceIcon}
                </div>
            </>
            <>
                <div
                    className={
                        current === 'blue'
                            ? blueClassName + effect
                            : blueClassName
                    }
                ></div>
                <div
                    className={`col-start-10 col-end-11 row-start-10 row-end-11 ${cellStyle}`}
                >
                    {videoIcon}
                </div>
                <div
                    className={`col-start-15 col-end-16 row-start-10 row-end-11 ${cellStyle}`}
                >
                    {voiceIcon}
                </div>
            </>
        </React.Fragment>
    )
}
