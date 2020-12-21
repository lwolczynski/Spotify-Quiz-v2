import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../Loader'
import Track from './Track'
import { getAllTracks } from '../../api/api.js'
import Button from 'react-bootstrap/Button'

const Game = () => {
    const [tracks, setTracks] = useState(null)
    const [trackNumber, setTrackNumber] = useState(0)
    const [score, setScore] = useState({'correct': 0, 'wrong': 0, 'left': null})
    const [started, setStarted] = useState(false)
    const [search, setSearch] = useState('')

    const location = useLocation();

    useEffect(() => {
        const execute = async () => {
            const fetchedTracks = await getAllTracks(location.state.playlistUrl, location.state.playlistType);
            setTracks(fetchedTracks.items);
            setScore(prevState => ({
                ...prevState,
                ['left']: fetchedTracks.items.length
            }))
        }
        execute()
    }, [])

    const answer = ({ item }) => {
        tracks[trackNumber].answered = true
        if (tracks[trackNumber].id === item.id) {
            setScore(prevState => ({
                ...prevState,
                ['correct']: score['correct']+1,
                ['left']: score['left']-1
            }))
            tracks[trackNumber].guessed = true
        } else {
            setScore(prevState => ({
                ...prevState,
                ['wrong']: score['wrong']+1,
                ['left']: score['left']-1
            }))
            tracks[trackNumber].guessed = false
        }
        setSearch('')
        setTrackNumber(trackNumber+1)
    }
    
    const renderTracks = () => {
        const searchRegex = new RegExp(search, "i");
        return tracks.reduce((result, item) => {
            return (searchRegex.test(item.name) || searchRegex.test(item.artists[0].name)) ? [...result, <Button variant={item.answered ? (item.guessed ? "success" : "danger") : "outline-dark"} disabled={item.answered || !started ? true : false} onClick={() => answer({item})}>{item.name} by {item.artists[0].name}</Button>] : result
        }, [])
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
                    <h3>Your score: {score.correct}/{tracks.length}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input onChange={(e) => setSearch(e.target.value)}/>
                    {renderTracks()}
                </div>
            </div>
        </div>
    )
}

export default Game