import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createSendTransportAction,
    getParams,
    update_params,
} from '../../../store/user'

export const PlayerVideo = ({ color }) => {
    const thisVideo = useRef(null)
    const dispatch = useDispatch()
    const params = useSelector(getParams)

    let [aspectRatio, setAspectRatio] = useState()

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
                dispatch(
                    update_params({
                        track,
                    })
                )
            })
            .catch((err) => {
                console.log('The following error occurred: ' + err)
            })

        if (color === 'red' || 'blue') {
            setAspectRatio({ objectFit: 'cover' })
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [color, dispatch])

    useEffect(() => {
        if (params.track) {
            console.log(params)
        }
    }, [params, dispatch])

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
