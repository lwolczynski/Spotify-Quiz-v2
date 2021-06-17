import React from 'react';
import { useLocation } from 'react-router-dom';

import List from './PlaylistsView/List';
import Game from './Game/Game';

const RouteHandler = () => {
    const location = useLocation();

    return (
        <>
            {location.state && location.state.playlistUrl && location.state.playlistType ? (
                <Game />
            ) : (
                <List />
            )}
        </>
    );
};

export default RouteHandler;
