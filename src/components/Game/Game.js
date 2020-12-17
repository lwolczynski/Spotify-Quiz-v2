import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../Loader'
import { getAllTracks } from '../../api/api.js'

const Game = () => {
    const [tracks, setTracks] = useState(null)

    const location = useLocation();

    useEffect(() => {
        window.history.replaceState({}, document.title, '/');
        const execute = async () => {
            const fetchedTracks = await getAllTracks(location.state.playlistUrl);
            setTracks(fetchedTracks.items);
        }
        execute()
    }, [])

    const renderTracks = () => {
        return tracks.map((item) => {
            return (
                <div>{item.name} by {item.artists[0].name}</div>
            )
        })
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            {renderTracks()}
        </div>
    )
}

export default Game