# Process of MediaSoup
1. Get Local Video
    ```
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
            // do something with stream.
        })
        .catch((err) => {
            // handle video/audio error.
        })
    ```
    Create a worker on server, using `mediasoup.createWorker` - 11:34

    Declare mediaCodecs, - 12:44

    Create device on client, using `mediasoupClient.Device`
    
    Send RTP Capabilities using router.rtpCapabilities from server to client. - 15:00

2. Get RTP Capabilities
3. Create Device - 14:05
4. Create Send Transport - 17:17
5. Connect Send Transport & Produce - 24:30
6. Create Receive Transport - 30:18
7. Connect Receive Transport & Consume - 34:15

# For Producer
    1. Get Local Video
    2. Get RTP Capabilities
    3. Create Device
    4. Create Send Transport
    5. Connect Send Transport & Produce

# For Consumer
    1. Get RTP Capabilities
    3. Create Device
    6. Create Receive Transport
    7. Connect Receive Transport & Consume