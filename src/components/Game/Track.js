import React, { useState, useEffect } from 'react'
import Image from 'react-bootstrap/Image'

const Track = ({ track, paused }) => {
    const [audio, setAudio] = useState(null)

    useEffect(() => {
        const audio = new Audio(track.preview_url)
        setAudio(audio)
        audio.loop = true;
        audio.play();
        
        return () => {
            audio.pause()
        }
    }, [track])

    useEffect(() => {
        if (audio) {
            paused ? audio.pause() : audio.play()
        }
    }, [paused]) 

    return (
        <div>
            <Image className="game-album" src={track.album.images[0].url} />
        </div>
    )
}

export default Track