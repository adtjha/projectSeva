import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_API, colorNames } from '../../../Constants'
import { getGameId, getUserId } from '../../../store/user'

export const PlayerVideo = ({
    color,
    device,
    params,
    setParams,
    getRtpCapabilities,
}) => {
    const thisVideo = useRef(null)
    const dispatch = useDispatch()
    const gameId = useSelector(getGameId)
    const userId = useSelector(getUserId)
    const [producerTransport, setProducerTransport] = useState(null)
    const [producer, setProducer] = useState(null)

    let [aspectRatio, setAspectRatio] = useState()

    const createSendTransport = useCallback(async () => {
        const res = await fetch(`${BASE_API}/mediasoup/createWebRtcTransport`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: true,
                userId,
                roomId: gameId,
            }),
        })
        console.log(res.json.params)
        setParams(res.json.params)
    }, [setParams, gameId, userId])

    const handleTransportConnect = useCallback(
        async ({ dtlsParameters }, callback, errback) => {
            try {
                await fetch(`${BASE_API}/mediasoup/transport-connect`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        dtlsParameters,
                        userId,
                        roomId: gameId,
                    }),
                })
                callback()
            } catch (error) {
                errback(error)
            }
        },
        [gameId, userId]
    )

    const handleTransportProduce = useCallback(
        async (parameters, callback, errback) => {
            try {
                const res = await fetch(
                    `${BASE_API}/mediasoup/transport-produce`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData,
                            userId,
                            roomId: gameId,
                        }),
                    }
                )
                console.log('producerTransport.on -> produce', res.json)
                callback({ ...res.json })
            } catch (error) {
                errback(error)
            }
        },
        [gameId, userId]
    )

    const connectSendTransport = useCallback(async () => {
        const prod = await producerTransport.produce(params)
        setProducer(prod)

        producer.on('trackended', () => {
            console.log('track ended')
            // close video track
        })

        producer.on('transportclose', () => {
            console.log('transport ended')
            // close video track
        })
    }, [params, producer, producerTransport])

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video: {
                    width: 640,
                    height: 480,
                    facingMode: 'user',
                },
            })
            .then((stream) => {
                thisVideo.current.srcObject = stream
                const track = stream.getVideoTracks()[0]
                setParams({
                    track,
                    ...params,
                })

                device === null ? getRtpCapabilities() : createSendTransport()

                console.log('setProducerTransport', params)

                setProducerTransport(device.createSendTransport(params))

                console.log('producerTransport')

                producerTransport.on('connect', handleTransportConnect)

                producerTransport.on('produce', handleTransportProduce)

                connectSendTransport()
            })
            .catch((err) => {
                console.log('The following error occurred: ' + err)
            })

        if (color === 'red' || 'blue') {
            setAspectRatio({ objectFit: 'cover' })
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [
        color,
        connectSendTransport,
        createSendTransport,
        device,
        getRtpCapabilities,
        handleTransportConnect,
        handleTransportProduce,
        params,
        producerTransport,
        setParams,
    ])

    return (
        <div
            style={
                color === 'red' || color === 'blue'
                    ? { height: '144px' }
                    : { height: '184px' }
            }
        >
            <video
                className="h-full"
                style={aspectRatio}
                ref={thisVideo}
                autoPlay
                muted
            />
        </div>
    )
}
