import { SocketContext } from 'connect/socket'
import React, { useEffect, useRef, useContext } from 'react'

export const OtherPlayerVideo = (props) => {
    const thisVideo = useRef(null)
    const socket = useContext(SocketContext)
    const peer = useRef(
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org',
                },
            ],
        })
    )

    const handleNegotiationNeededEvent = async (peer) => {
        console.log(peer.current, 'offer')
        const offer = await peer.current.createOffer()

        console.log(peer.current, 'local description')
        await peer.current.setLocalDescription(offer)

        socket.emit('consumer', {
            sdp: peer.current.localDescription,
        })
    }

    useEffect(() => {
        console.log(peer.current, 'adding track')
        peer.current.ontrack = (e) => {
            console.log(peer.current, e, 'ontrack')
            thisVideo.current.srcObject = e.streams[0]
        }

        console.log(peer.current, 'negotiation')
        peer.current.onnegotiationneeded = handleNegotiationNeededEvent(peer)

        socket.on('consumer_res', (data) => {
            console.log('consumer_res', data)
            const desc = new RTCSessionDescription(data.sdp)
            peer.current
                .setRemoteDescription(desc)
                .then()
                .catch((e) => console.error(e))
        })
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
