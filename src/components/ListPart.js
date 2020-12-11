import React, { useState } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import Tile from './Tile'

const ListPart = ({ name, num, storage, url }) => {
    
    const [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem(storage)).items || [])

    const renderTiles = () => {

        if (!playlists) {
            return ""
        }

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
                <h5 className="mb-0">
                    <button className="btn btn-link">{name}</button>
                </h5>
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