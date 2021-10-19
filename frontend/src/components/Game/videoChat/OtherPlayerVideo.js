import axios from 'axios'
import Constants from 'Constants'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { getGameId, getUserId } from 'store/user'

export const OtherPlayerVideo = (props) => {
    const thisVideo = useRef(null)
    const peer = useRef(null)
    let [aspectRatio, setAspectRatio] = useState()
    const userID = useSelector(getUserId)
    const gameID = useSelector(getGameId)

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
                Constants.BASE_API + '/consumer',
                {
                    sdp: peer.localDescription,
                    user: user,
                }
            )

            // console.log('consumer_res', data, props)
            const desc = new RTCSessionDescription(data.sdp)
            peer.setRemoteDescription(desc).catch((e) => console.error(e))
        },
        [gameID, userID, props]
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
        peer.onnegotiationneeded = handleNegotiationNeededEvent(peer)

        return peer
    }, [handleNegotiationNeededEvent])

    const handleTrackEvent = (e) => {
        console.log(peer, e, 'ontrack')
        thisVideo.current.srcObject = e.streams[0]
    }

    useEffect(() => {
        if (
            props.thisPlayerColor !== '' &&
            props.thisPlayerColor !== props.color
        ) {
            peer.current = createPeer()
            console.log('peer created', peer.current)
            console.log(peer, 'adding track')
            peer.current.ontrack = handleTrackEvent
            peer.current.addTransceiver('video', { direction: 'recvonly' })
        }
        if (props.color === 'red' || 'blue') {
            setAspectRatio({ height: '50%', objectFit: 'cover' })
        } else {
            setAspectRatio({ height: '160%', objectFit: 'cover' })
        }
    }, [setAspectRatio, createPeer, props])

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
