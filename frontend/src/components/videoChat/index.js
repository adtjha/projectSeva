import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getGameCurrentPlayer } from 'store/user'

export const VideoChat = () => {
    const [current, setCurrent] = useState('')

    const currentPlayer = useSelector(getGameCurrentPlayer)

    const redClassName =
        'col-start-1 col-end-6 row-start-1 row-end-5 bg-red-200 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1 '
    const greenClassName =
        'col-start-10 col-end-14 row-start-1 row-end-6  bg-green-200 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1 '
    const yellowClassName =
        'col-start-1 col-end-5 row-start-9 row-end-14 bg-yellow-200 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1 '
    const blueClassName =
        'col-start-9 col-end-14 row-start-10 row-end-14  bg-blue-200 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1 '

    useEffect(() => {
        setCurrent(currentPlayer)

        return () => {
            setCurrent('')
        }
    }, [setCurrent, currentPlayer])

    return (
        <React.Fragment>
            <div
                className={
                    current === 'red'
                        ? redClassName + 'border-2 border-double border-black'
                        : redClassName + 'border-2 border-double border-red-400'
                }
            ></div>
            <div
                className={
                    current === 'green'
                        ? greenClassName + 'border-2 border-double border-black'
                        : greenClassName +
                          'border-2 border-double border-green-400'
                }
            ></div>
            <div
                className={
                    current === 'yellow'
                        ? yellowClassName +
                          'border-2 border-double border-black'
                        : yellowClassName +
                          'border-2 border-double border-yellow-400'
                }
            ></div>
            <div
                className={
                    current === 'blue'
                        ? blueClassName + 'border-2 border-double border-black'
                        : blueClassName +
                          'border-2 border-double border-blue-400'
                }
            ></div>
        </React.Fragment>
    )
}
