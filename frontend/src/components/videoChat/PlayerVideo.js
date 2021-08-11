import React, { useRef } from 'react'
import axios from 'axios'
import Constants from 'Constants'
import { useSelector } from 'react-redux'
import { getGameId, getUserId } from 'store/user'
import { useEffectOnce } from 'react-use'

export const PlayerVideo = (props) => {
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

        console.log(peer, 'negotiation')
        peer.onnegotiationneeded = () => handleNegotiationNeededEvent(peer)

        return peer
    }

    const handleNegotiationNeededEvent = async (peer) => {
        console.log(peer, 'offer')
        const offer = await peer.createOffer()

        console.log(peer, 'local description')
        await peer.setLocalDescription(offer)

        const { data } = await axios.post(Constants.BASE_API + '/broadcast', {
            sdp: peer.localDescription,
            user: user,
        })

        console.log('broadcast_res', data, props)
        const desc = new RTCSessionDescription(data.sdp)
        peer.setRemoteDescription(desc)
            .then()
            .catch((e) => console.error(e))
    }

    useEffectOnce(() => {
        if (props.thisPlayerColor === props.color) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        width:
                            props.color === 'red' || props.color === 'blue'
                                ? 940
                                : 740,
                        height:
                            props.color === 'red' || props.color === 'blue'
                                ? 740
                                : 940,
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
    })

    return (
        <video
            ref={thisVideo}
            className="min-w-full min-h-full transform scale-110"
            autoPlay
            muted
        />
    )
}


/**
 * red, blue : 188 * 148,
 * green, yellow : 148 * 188
 */