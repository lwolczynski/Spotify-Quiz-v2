import React from 'react'
import Button from 'react-bootstrap/Button'

const TrackList = ({ tracks, disabled, search, sendAnswer }) => {

    const answer = ({ item }) => {
        sendAnswer(item)
    }

    const renderTracks = () => {
        const searchRegex = new RegExp(search, "i")
        return tracks.reduce((result, item, index) => {
            return (searchRegex.test(item.name) || searchRegex.test(item.artists[0].name)) ? [...result, <Button className="mx-1 my-1" key={index} variant={item.answered ? (item.guessed ? "success" : "danger") : "outline-secondary"} disabled={item.answered || disabled ? true : false} onClick={() => answer({item})}>{item.name} by {item.artists[0].name}</Button>] : result
        }, [])
    }

    return (
        <div className="mx-n1" style={{textAlign: 'center'}}>
            {renderTracks()}
        </div>
    )

}

export default TrackList