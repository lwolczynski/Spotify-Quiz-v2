import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Tile = ({ img, name, tracks }) => {

    const [redirect, setRedirect] = useState(false)

    const play = () => {
        setRedirect(true)
    }

    return (
        redirect ? <Redirect to={{ pathname: "/play", state: { playlistUrl: tracks, playlistName: name } }} /> :
        <li className="album-tile">
            <button onClick={play} className="album-tile-button button-transparent">
                <img src={img} alt={name} className="album-img" />
                <span className="album-name">{name}</span>
            </button>
        </li>
    )

}

export default Tile