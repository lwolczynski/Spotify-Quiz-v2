import React, { useEffect, useRef } from 'react'
import Image from 'react-bootstrap/Image'

const Track = ({ track, paused }) => {
    
    const myAudio = useRef()

    useEffect(() => {
        myAudio.current.play()  
    }, [track])

    useEffect(() => {
        paused ? myAudio.current.pause() : myAudio.current.play()
    }, [paused]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Image className="game-album" src={track.album.images[0].url} />
            <audio src={track.preview_url} ref={myAudio} type='audio' style={{ display: 'none' }} loop />
        </>
    )
}

export default Track