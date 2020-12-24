import React from 'react'
import { useLocation } from 'react-router-dom'

import List from './PlaylistsView/List'
import Game from './Game/Game'

const RouteHandler = () => {
    const location = useLocation()

    return (
        <>
            {(location.state && location.state.hasOwnProperty('playlistUrl') && location.state.hasOwnProperty('playlistType')) ? <Game /> : <List />}
        </>
    )
}

export default RouteHandler