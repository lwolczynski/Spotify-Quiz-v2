import React, { useState } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

const TrackList = ({ tracks, started, sendAnswer }) => {

    const [search, setSearch] = useState('')

    const answer = ({ item }) => {
        setSearch('')
        sendAnswer(item)
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
        <>
        {renderInput()}
        <div className="mx-n1" style={{textAlign: 'center'}}>
            {renderTracks()}
        </div>
        </>  
    )

}

export default TrackList