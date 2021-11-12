import React, { useEffect, useRef, useState } from 'react'

export const OtherPlayerVideo = (props) => {
    const thisVideo = useRef(null)
    let [aspectRatio, setAspectRatio] = useState()


    useEffect(() => {
        if (
            props.thisPlayerColor !== '' &&
            props.thisPlayerColor !== props.color
        ) {
            console.log('Other Player Video')
        }
        if (props.color === 'red' || 'blue') {
            setAspectRatio({ height: '50%', objectFit: 'cover' })
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [setAspectRatio, props])

    return (
        <div
            style={
                (props.color === 'red' || props.color === 'blue')
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
