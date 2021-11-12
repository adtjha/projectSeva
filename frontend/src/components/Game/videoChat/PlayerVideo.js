import React, { useEffect, useRef, useState } from 'react'

export const PlayerVideo = (props) => {
    const thisVideo = useRef(null)

    let [aspectRatio, setAspectRatio] = useState()

    useEffect(() => {
        if (props.thisPlayerColor === props.color) {
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
                })
                .catch((err) => {
                    console.log('The following error occurred: ' + err.name)
                })
        }

        if (props.color === 'red' || 'blue') {
            setAspectRatio({objectFit: 'cover'})
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [setAspectRatio, props])

    return (
        <div
            style={
                props.color === 'red' || props.color === 'blue'
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
