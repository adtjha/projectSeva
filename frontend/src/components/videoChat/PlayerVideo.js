import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'


export const PlayerVideo = () => {
    const thisVideo = useRef(null)

    navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia

    useEffect(() => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia(
                { audio: false, video: { width: 480, height: 480 } },
                (stream) => {
                    thisVideo.current.srcObject = stream
                    console.log('here', stream)
                },
                (err) => {
                    console.log('The following error occurred: ' + err.name)
                }
            )
        } else {
            console.log('getUserMedia not supported')
        }
    })

    return (
        <video ref={thisVideo} className="min-w-full min-h-full" autoPlay muted />
    )
}


