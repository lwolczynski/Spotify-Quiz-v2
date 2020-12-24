import React from 'react'
import { useHistory } from 'react-router-dom'

const Tile = ({ img, name, tracks, playlistType }) => {

    const history = useHistory()

    return (
        <li className="album-tile">
            <button onClick={() => {
                history.push({ pathname: '/', state: { playlistUrl: tracks, playlistName: name, playlistType }})
            }} className="album-tile-button button-transparent">
                <img src={img} alt={name} className="album-img" />
                <span className="album-name">{name}</span>
            </button>
        </li>
    )

}

export default Tile