import { SocketContext } from 'connect/socket'
import React, { useEffect, useRef, useContext } from 'react'

export const PlayerVideo = (props) => {
    const thisVideo = useRef(null)
    const socket = useContext(SocketContext)

    const handleNegotiationNeededEvent = async (peer) => {
        console.log(peer.current, 'offer')
        const offer = await peer.current.createOffer()

        console.log(peer.current, 'local description')
        await peer.current.setLocalDescription(offer)

        socket.emit('broadcast', {
            sdp: peer.current.localDescription,
        })
    }

    const peer = useRef(
        new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.stunprotocol.org',
                },
            ],
        })
    )

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

                    console.log(peer.current, 'negotiation')
                    peer.current.onnegotiationneeded = () =>
                        handleNegotiationNeededEvent(peer)

                    stream
                        .getTracks()
                        .forEach((track) =>
                            peer.current.addTrack(track, stream)
                        )

                    socket.on('broadcast_res', (data) => {
                        console.log('broadcast_res', data)
                        const desc = new RTCSessionDescription(data.sdp)
                        peer.current
                            .setRemoteDescription(desc)
                            .then()
                            .catch((e) => console.error(e))
                    })
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
        <video
            ref={thisVideo}
            className="min-w-full min-h-full"
            autoPlay
            muted
        />
    )
}
