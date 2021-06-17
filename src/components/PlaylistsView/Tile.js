import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const Tile = ({ img, name, tracks, playlistType }) => {
    const history = useHistory();

    return (
        <li className="album-tile">
            <Button
                variant="light"
                onClick={() => {
                    history.push({
                        pathname: '/',
                        state: { playlistUrl: tracks, playlistName: name, playlistType },
                    });
                }}
                className="album-tile-button"
            >
                <img src={img} alt={name} className="album-img" />
                <span className="album-name">{name}</span>
            </Button>
        </li>
    );
};

export default Tile;
