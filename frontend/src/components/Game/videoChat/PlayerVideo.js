import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Constants from 'Constants'
import { useSelector } from 'react-redux'
import { getGameId, getUserId } from 'store/user'

export const PlayerVideo = (props) => {
    const thisVideo = useRef(null)
    const peer = useRef(null)

    const userID = useSelector(getUserId)
    const gameID = useSelector(getGameId)
    let [aspectRatio, setAspectRatio] = useState()

    const handleNegotiationNeededEvent = useCallback(
        async (peer) => {
            // console.log(peer, 'offer')
            const offer = await peer.createOffer()

            // console.log(peer, 'local description')
            await peer.setLocalDescription(offer)

            const user = {
                id: userID,
                color: props.color,
                game_id: gameID,
            }

            const { data } = await axios.post(
                Constants.BASE_API + '/broadcast',
                {
                    sdp: peer.localDescription,
                    user: user,
                }
            )

            // console.log('broadcast_res', data, props)
            const desc = new RTCSessionDescription(data.sdp)
            peer.setRemoteDescription(desc)
                .then()
                .catch((e) => console.error(e))
        },
        [gameID, props, userID]
    )

    const createPeer = useCallback(() => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org',
                },
            ],
        })

        // console.log(peer, 'negotiation')
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer)

        return peer
    }, [handleNegotiationNeededEvent])

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

                    peer.current = createPeer()

                    stream
                        .getTracks()
                        .forEach((track) =>
                            peer.current.addTrack(track, stream)
                        )
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
    }, [setAspectRatio, createPeer, props])

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
