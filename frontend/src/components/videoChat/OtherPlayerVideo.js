import axios from 'axios'
import Constants from 'Constants'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { getGameId, getUserId } from 'store/user'

export const OtherPlayerVideo = (props) => {
    const thisVideo = useRef(null)
    const peer = useRef(null)
    const user = {
        id: useSelector(getUserId),
        color: props.color,
        game_id: useSelector(getGameId),
    }

    const createPeer = () => {
        const peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org',
                },
            ],
        })

        console.log(peer, 'adding track')
        peer.ontrack = handleTrackEvent

        console.log(peer, 'negotiation')
        peer.onnegotiationneeded = handleNegotiationNeededEvent(peer)

        return peer
    }

    const handleTrackEvent = (e) => {
        console.log(peer, e, 'ontrack')
        thisVideo.current.srcObject = e.streams[0]
    }

    const handleNegotiationNeededEvent = async (peer) => {
        console.log(peer, 'offer')
        const offer = await peer.createOffer()

        console.log(peer, 'local description')
        await peer.setLocalDescription(offer)

        const { data } = await axios.post(Constants.BASE_API + '/consumer', {
            sdp: peer.localDescription,
            user: user,
        })

        console.log('consumer_res', data, props)
        const desc = new RTCSessionDescription(data.sdp)
        peer.setRemoteDescription(desc).catch((e) => console.error(e))
    }

    useEffect(() => {
        if (
            props.thisPlayerColor !== '' &&
            props.thisPlayerColor !== props.color
        ) {
            peer.current = createPeer()
            console.log('peer created', peer.current)
            peer.current.addTransceiver('video', { direction: 'recvonly' })
        }
    })

    return (
        <video
            ref={thisVideo}
            className="min-w-full min-h-full"
            autoPlay
            muted
        />
    )
}
