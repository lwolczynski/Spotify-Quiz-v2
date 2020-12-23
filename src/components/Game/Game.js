import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useTimer from '../hooks/useTimer';
import Loader from '../Loader'
import Controls from './Controls'
import Track from './Track'
import TrackList from './TrackList'
import { getAllTracks } from '../../api/api.js'
import { shuffleArray } from '../../utils/utils.js'

import Image from 'react-bootstrap/Image'

const Game = () => {
    const [tracks, setTracks] = useState(null)
    const [currentTrackNo, setCurrentTrackNo] = useState(0)
    const [tracksOrder, setTracksOrder] = useState(null)
    const [gameState, setGameState] = useState('init') // 'init', 'started', 'paused', 'finished'
    const [score, setScore] = useState({'correct': 0, 'wrong': 0})

    const isFirstRun = useRef(true);

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
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        switch(gameState) {
            case 'init':
                setScore({'correct': 0, 'wrong': 0})
                tracks.map(track => {
                    track.answered = null
                    track.guessed = null
                })
                randomizeOrder()
                resetTimer()
                setCurrentTrackNo(0)
            case 'started':
                startTimer()
                break;
            case 'paused':
                pauseTimer()
                break;
            case 'finished':
                pauseTimer()
        }
    }, [gameState])

    const randomizeOrder = (numOfTracks = tracks.length) => {
        const order = [...Array(numOfTracks).keys()]
        shuffleArray(order)
        setTracksOrder(order)
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
        currentTrackNo === tracks.length-1 ? setGameState('finished') : setCurrentTrackNo(currentTrackNo+1)
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            <div className="row mb-2">
                <div className="col-md-6">
                    {(gameState !== 'init') ? <Track track={tracks[tracksOrder[currentTrackNo]]} paused={(gameState !== 'started')} /> : <Image className="game-album" src="/img/covers/no_cover.png" />}
                </div>
                <div className="col-md-6">
                    <h3>Your score: {score.correct}/{tracks.length}</h3>
                    <h3>{printTimer()}</h3>
                    <Controls gameState={gameState} setGameState={setGameState} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TrackList tracks={tracks} disabled={(gameState !== 'started')} sendAnswer={answer} />
                </div>
            </div>
        </div>
    )
}

export default Game