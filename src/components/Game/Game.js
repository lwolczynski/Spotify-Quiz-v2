import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../Loader'
import Track from './Track'
import { getAllTracks } from '../../api/api.js'
import Button from 'react-bootstrap/Button'

const Game = () => {
    const [tracks, setTracks] = useState(null)
    const [trackNumber, setTrackNumber] = useState(0)
    const [score, setScore] = useState(0)
    const [started, setStarted] = useState(false)

    const location = useLocation();

    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await getAllTracks(location.state.playlistUrl, location.state.playlistType);
            setTracks(fetchedTracks.items);
        }
        execute()
    }, [])

    const renderTracks = () => {
        return tracks.map((item) => {
            return (
                <Button variant="outline-dark" onClick={() => setTrackNumber(trackNumber+1)}>{item.name} by {item.artists[0].name}</Button>
            )
        })
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            <div className="row">
                <div className="col-6">
                    {started ? <Track track={tracks[trackNumber]} /> : <Button onClick={() => setStarted(true)}>Start</Button>}
                </div>
                <div className="col-6">
                    <h3>Your score: {score}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input />
                    {renderTracks()}
                </div>
            </div>
        </div>
    )
}

export default Game