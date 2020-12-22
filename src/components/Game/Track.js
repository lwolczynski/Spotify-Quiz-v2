import React, { useEffect } from 'react'
import Image from 'react-bootstrap/Image'

const Track = ({ track }) => {

    useEffect(() => {
        const audio = new Audio(track.preview_url);
        audio.loop = true;
        audio.play();
        
        return () => {
            audio.pause()
        }
    }, [track])

    return (
        
        <div>
            <Image className="game-album" src={track.album.images[0].url} />
        </div>
    )
}

export default Track