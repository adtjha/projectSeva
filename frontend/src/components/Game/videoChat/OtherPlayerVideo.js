import React, { useEffect, useRef, useState } from 'react'

export const OtherPlayerVideo = ({ color, device }) => {
    const thisVideo = useRef(null)
    let [aspectRatio, setAspectRatio] = useState()
    const [consumerTransport, setConsumerTransport] = useState(null)
    const [consumer, setConsumer] = useState(null)

    useEffect(() => {
        console.log('Other Player Video')
        if (color === 'red' || 'blue') {
            setAspectRatio({ height: '50%', objectFit: 'cover' })
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [setAspectRatio, color])

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
