import React from 'react'
import { useSelector } from 'react-redux'
import { getColor } from '../../store/user'
import { OtherPlayerVideo } from './OtherPlayerVideo'
import { PlayerVideo } from './PlayerVideo'

export const VideoChat = () => {
    const thisPlayerColor = useSelector(getColor)

    return (
        <React.Fragment>
            <div className="col-start-1 col-end-6 row-start-1 row-end-5 bg-transparent border-2 border-double border-red-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
                {thisPlayerColor === 'red' ? (
                    <PlayerVideo color="red" />
                ) : (
                    <OtherPlayerVideo color="red" />
                )}
            </div>
            <div className="col-start-10 col-end-14 row-start-1 row-end-6 bg-transparent border-2 border-double border-green-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
                {thisPlayerColor === 'green' ? (
                    <PlayerVideo color="green" />
                ) : (
                    <OtherPlayerVideo color="green" />
                )}
            </div>
            <div className="col-start-1 col-end-5 row-start-9 row-end-14 bg-transparent border-2 border-double border-yellow-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
                {thisPlayerColor === 'yellow' ? (
                    <PlayerVideo color="yellow" />
                ) : (
                    <OtherPlayerVideo color="yellow" />
                )}
            </div>
            <div className="col-start-9 col-end-14 row-start-10 row-end-14 bg-transparent border-2 border-double border-blue-400 rounded-2xl overflow-hidden shadow-md lg:mb-1 lg:mr-1">
                {thisPlayerColor === 'blue' ? (
                    <PlayerVideo color="blue" />
                ) : (
                    <OtherPlayerVideo color="blue" />
                )}
            </div>
        </React.Fragment>
    )
}
