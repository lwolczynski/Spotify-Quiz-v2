import React, { useState , useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loader from '../Loader'
import Track from './Track'
import { getAllTracks } from '../../api/api.js'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

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
            return (searchRegex.test(item.name) || searchRegex.test(item.artists[0].name)) ? [...result, <Button className="mx-1 my-1" variant={item.answered ? (item.guessed ? "success" : "danger") : "outline-secondary"} disabled={item.answered || !started ? true : false} onClick={() => answer({item})}>{item.name} by {item.artists[0].name}</Button>] : result
        }, [])
    }

    const renderInput = () => {
        return (
            <InputGroup className="mb-1">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        )
    }

    return (
        tracks === null ? <Loader /> :        
        <div className="container main">
            <h1>{location.state.playlistName}</h1>
            <div className="row mb-2">
                <div className="col-md-6">
                    {started ? <Track track={tracks[trackNumber]} /> : <Button onClick={() => setStarted(true)}>Start</Button>}
                </div>
                <div className="col-md-6">
                    <h3>Your score: {score.correct}/{tracks.length}</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {renderInput()}
                    <div className="mx-n1" style={{textAlign: 'center'}}>
                        {renderTracks()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game