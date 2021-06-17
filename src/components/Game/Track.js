import React, { useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';

const Track = ({ track, paused }) => {
    const myAudio = useRef();

    useEffect(() => {
        myAudio.current.play();
    }, [track]);

    useEffect(() => {
        if (paused) myAudio.current.pause();
        else myAudio.current.play();
    }, [paused]);

    return (
        <>
            <Image className="game-album" src={track.album.images[0].url} />
            <audio
                src={track.preview_url}
                ref={myAudio}
                type="audio"
                style={{ display: 'none' }}
                loop
            />
        </>
    );
};

export default Track;
