import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../Loader'
import Track from './Track'
import TrackList from './TrackList'
import { getAllTracks } from '../../api/api.js'
import Button from 'react-bootstrap/Button'

import Image from 'react-bootstrap/Image'

const Game = () => {
    const [tracks, setTracks] = useState(null)
    const [currentTrackNo, setCurrentTrackNo] = useState(0)
    const [started, setStarted] = useState(false)
    const [score, setScore] = useState({'correct': 0, 'wrong': 0})

    const location = useLocation();

    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await getAllTracks(location.state.playlistUrl, location.state.playlistType);
            setTracks(fetchedTracks.items);
        }
        execute()
    }, [])


    const answer = (item) => {
        tracks[currentTrackNo].answered = true
        if (tracks[currentTrackNo].id === item.id) {
            setScore(prevState => ({
                ...prevState,
                'correct': score['correct']+1
            }))
            tracks[currentTrackNo].guessed = true
        } else {
            setScore(prevState => ({
                ...prevState,
                'wrong': score['wrong']+1
            }))
            tracks[currentTrackNo].guessed = false
        }
        setCurrentTrackNo(currentTrackNo+1)
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            <div className="row mb-2">
                <div className="col-md-6">
                    {started ? <Track track={tracks[currentTrackNo]} /> : <Image className="game-album" src="/img/covers/no_cover.png" />}
                </div>
                <div className="col-md-6">
                    <h3>Your score: {score.correct}/{tracks.length}</h3>
                    <Button onClick={() => setStarted(true)}>Start</Button>
                    <Button>Pause</Button>
                    <Button>Restart</Button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TrackList tracks={tracks} started={started} sendAnswer={answer} />
                </div>
            </div>
        </div>
    )
}

export default Game