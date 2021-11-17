import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
    redClassName,
    greenClassName,
    blueClassName,
    yellowClassName,
    iconStyle,
    cellStyle,
    BASE_API,
} from '../../../Constants'
import {
    getDevice,
    getGameCurrentPlayer,
    getGameId,
    getRtpCapabilities,
    getUserId,
} from '../../../store/user'
import { OtherPlayerVideo } from './OtherPlayerVideo'
import { PlayerVideo } from './PlayerVideo'
import { Device } from 'mediasoup-client'

export const VideoChat = () => {
    const [current, setCurrent] = useState('')
    // const [device, setDevice] = useState(null)
    // const gameId = useSelector(getGameId)
    // const userId = useSelector(getUserId)
    // const [params, setParams] = useState({
    //     encodings: [
    //         {
    //             rid: 'r0',
    //             maxBitrate: 100000,
    //             scalabilityMode: 'S1T3',
    //         },
    //         {
    //             rid: 'r1',
    //             maxBitrate: 300000,
    //             scalabilityMode: 'S1T3',
    //         },
    //         {
    //             rid: 'r2',
    //             maxBitrate: 900000,
    //             scalabilityMode: 'S1T3',
    //         },
    //     ],
    //     codecOptions: {
    //         videoGoogleStartBitrate: 1000,
    //     },
    // })
    // const [rtpCapabilities, setRtpCapabilities] = useState(null)

    const getCurentVideo = (current, color) => {
        // return current === color ? (
        //     <PlayerVideo
        //         color={color}
        //         device={device}
        //         params={params}
        //         setParams={setParams}
        //         getRtpCapabilities={getRtpCapabilities}
        //     />
        // ) : (
        //     <OtherPlayerVideo
        //         color={color}
        //         device={device}
        //         params={params}
        //         setParams={setParams}
        //         getRtpCapabilities={getRtpCapabilities}
        //     />
        // )
        return ''
    }

    // const createDevice = useCallback(() => {
    //     setDevice(new Device())
    //     device
    //         .load({ routerRtpCapabilities: rtpCapabilities })
    //         .then((e) => console.log('device loaded'))
    // }, [device, rtpCapabilities])

    // const getRtpCapabilities = useCallback(async () => {
    //     const res = await fetch(`${BASE_API}/mediasoup/getRtp`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             userId,
    //             roomId: gameId,
    //         }),
    //     })
    //     console.log('SETTING RTP Capability:', { ...res.json })
    //     setRtpCapabilities(res.json)
    //     // createDevice()
    // }, [gameId, userId])

    const currentPlayer = useSelector(getGameCurrentPlayer)
    const rtp = useSelector(getRtpCapabilities)
    const device = useSelector(getDevice)

    const effect = ' animate-wiggle'

    useEffect(() => {
        setCurrent(currentPlayer)
        rtp && console.log(rtp)
        device && console.log(device)

        return () => {
            setCurrent('')
        }
    }, [currentPlayer, device, rtp])

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
                >
                    {getCurentVideo(current, 'red')}
                </div>
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
                >
                    {getCurentVideo(current, 'green')}
                </div>
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
                >
                    {getCurentVideo(current, 'yellow')}
                </div>
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
                >
                    {getCurentVideo(current, 'blue')}
                </div>
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
