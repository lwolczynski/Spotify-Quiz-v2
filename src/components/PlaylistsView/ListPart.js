import React, { useState, useEffect, useContext } from 'react'
import { Accordion, Card } from 'react-bootstrap'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { IconContext } from "react-icons"
import { FaRedoAlt } from 'react-icons/fa'
import Tile from './Tile'
import Button from 'react-bootstrap/Button'
import { getAllPlaylists } from '../../api/api.js'

const ListPart = ({ name, num, storage, url }) => {
    const [playlists, setPlaylists] = useState(() => {
        try {
            const savedData = window.localStorage.getItem(storage)
            return JSON.parse(savedData).items
        } catch (err) {
            return []
        }
    })
    const accordionValue = useContext(AccordionContext)

    useEffect(() => {
        if (localStorage.getItem(storage) === null) fetchPlaylists()
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const fetchPlaylists = async () => {
        const fetchedPlaylists = await getAllPlaylists(url)
        if (fetchedPlaylists) {
            window.localStorage.setItem(storage, JSON.stringify(fetchedPlaylists))
            setPlaylists(fetchedPlaylists.items)
        }
    }

    const refresh = async (e) => {
        if (accordionValue === num) {
            e.stopPropagation()
        }
        fetchPlaylists()
    }

    const renderTiles = () => {

        return playlists.map((item, index) => {
            let img
            try {
                img = item.images[0].url
            } catch (err) {
                img = "/img/covers/no_cover.png"
            }
            return (
                <Tile img={img} name={item.name} tracks={item.tracks.href} key={item.id} playlistType="regular" />
            )
        })
    }

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={num}>                
                <Button variant="link">{name}</Button>
                <Button variant="link" onClick={(e) => refresh(e)} className="float-right">
                    <IconContext.Provider  value={{ style: { opacity: '0.5' } }}>
                        <FaRedoAlt />
                    </IconContext.Provider>
                </Button>
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