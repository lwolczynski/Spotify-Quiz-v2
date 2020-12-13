import React, { useState, useEffect } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import { IconContext } from "react-icons"
import { FaRedoAlt } from 'react-icons/fa'
import Tile from './Tile'
import { getAllPlaylists } from '../api/api.js'

const ListPart = ({ name, num, storage, url }) => {
    //MAKE LOCAL STORAGE DEFAULT STATE SOMEHOW!!!
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        try {
            const savedData = window.localStorage.getItem(storage);
            setPlaylists(JSON.parse(savedData).items);
        } catch (err) {
            fetchPlaylists(storage, url);
        }
    }, [])


    const fetchPlaylists = async (storage, url) => {
        const fetchedPlaylists = await getAllPlaylists(url);
        if (fetchedPlaylists) {
            window.localStorage.setItem(storage, JSON.stringify(fetchedPlaylists));
            setPlaylists(fetchedPlaylists.items);
        }
    }


    const renderTiles = () => {

        return playlists.map((item, index) => {
            let img;
            try {
                img = item.images[0].url;
            } catch (err) {
                img = "/img/covers/no_cover.png";
            }
            return (
                <Tile img={img} name={item.name} tracks={item.tracks.href} key={item.id} />
            )
        })
    }

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={num}>                
                <button className="btn btn-link">{name}</button>
                <button onClick={() => fetchPlaylists(storage, url)} className="btn btn-link float-right">
                    <IconContext.Provider  value={{ style: { opacity: '0.5' } }}>
                        <FaRedoAlt />
                    </IconContext.Provider>
                </button>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={num}>
                <ul className="card-body album-container">
                    {renderTiles()}
                </ul>
            </Accordion.Collapse>
        </Card>
    )
}

export default ListPart