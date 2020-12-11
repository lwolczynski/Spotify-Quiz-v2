import React from 'react'

const Tile = ({ img, name, tracks }) => {

    return (
        <li className="album-tile">
            {/* <form className="album-tile-form" method="POST" action="/play"> */}
            <button className="album-tile-button button-transparent">
                {/* <input name="tracks" defaultValue={tracks} hidden /> */}
                <img src={img} alt={name} className="album-img" />
                <span className="album-name">{name}</span>
            </button>
            {/* </form> */}
        </li>
    )

}

export default Tile