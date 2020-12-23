import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import useTimer from '../hooks/useTimer';
import Loader from '../Loader'
import Track from './Track'
import TrackList from './TrackList'
import { getAllTracks } from '../../api/api.js'
import { shuffleArray } from '../../utils/utils.js'
import Button from 'react-bootstrap/Button'

import Image from 'react-bootstrap/Image'

const Game = () => {
    const [tracks, setTracks] = useState(null)
    const [currentTrackNo, setCurrentTrackNo] = useState(0)
    const [tracksOrder, setTracksOrder] = useState(null)
    const [started, setStarted] = useState(false)
    const [paused, setPaused] = useState(true)
    const [finished, setFinished] = useState(false)
    const [score, setScore] = useState({'correct': 0, 'wrong': 0})

    const location = useLocation();
    const { startTimer, pauseTimer, resetTimer, printTimer } = useTimer()

    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await getAllTracks(location.state.playlistUrl, location.state.playlistType);
            setTracks(fetchedTracks.items);
            randomizeOrder(fetchedTracks.items.length)
        }
        execute()
    }, [])

    useEffect(() => {
        paused ? pauseTimer() : startTimer()
    }, [paused])

    const randomizeOrder = (numOfTracks = tracks.length) => {
        const order = [...Array(numOfTracks).keys()]
        shuffleArray(order)
        setTracksOrder(order)
    }

    const startGame = () => {
        setStarted(true)
        startTimer()
        setPaused(false)
    }

    const finishGame = () => {
        setStarted(false)
        setPaused(true)
        setFinished(true)
    }

    const restartGame = () => {
        setStarted(false)
        setFinished(false)
        resetTimer()
        setScore({'correct': 0, 'wrong': 0})
        randomizeOrder()
        tracks.map(track => {
            track.answered = null
            track.guessed = null
        })
    }

    const answer = (item) => {
        tracks[tracksOrder[currentTrackNo]].answered = true
        if (tracks[tracksOrder[currentTrackNo]].id === item.id) {
            setScore(prevState => ({
                ...prevState,
                'correct': score['correct']+1
            }))
            tracks[tracksOrder[currentTrackNo]].guessed = true
        } else {
            setScore(prevState => ({
                ...prevState,
                'wrong': score['wrong']+1
            }))
            tracks[tracksOrder[currentTrackNo]].guessed = false
        }
        currentTrackNo === tracks.length-1 ? finishGame() : setCurrentTrackNo(currentTrackNo+1)
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            <div className="row mb-2">
                <div className="col-md-6">
                    {started ? <Track track={tracks[tracksOrder[currentTrackNo]]} paused={paused} /> : <Image className="game-album" src="/img/covers/no_cover.png" />}
                </div>
                <div className="col-md-6">
                    <h3>Your score: {score.correct}/{tracks.length}</h3>
                    <h3>{printTimer()}</h3>
                    {!started && !finished && <Button onClick={startGame}>Start</Button>}
                    {started && <Button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</Button>}
                    {(finished || started) && <Button onClick={restartGame}>Restart</Button>}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TrackList tracks={tracks} disabled={(started && !paused)} sendAnswer={answer} />
                </div>
            </div>
        </div>
    )
}

export default Game