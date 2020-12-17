import React, { useState , useEffect } from 'react'

const Track = ({ track }) => {

    useEffect(() => {
        console.log(track)
        const audio = new Audio(track.preview_url);
        audio.play();
        
        return () => {
            audio.pause()
        }
    }, [track])

    return (
        <div>
           <img src={track.album.images[0].url} />
        </div>
    )
}

export default Track