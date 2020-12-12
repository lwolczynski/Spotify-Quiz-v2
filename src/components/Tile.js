import React from 'react'

const Tile = ({ img, name, tracks }) => {

    return (
        <li className="album-tile">
            <button className="album-tile-button button-transparent">
                <img src={img} alt={name} className="album-img" />
                <span className="album-name">{name}</span>
            </button>
        </li>
    )

}

export default Tile