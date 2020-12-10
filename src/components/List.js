import React from 'react'
import ListPart from './ListPart'
import { Accordion } from 'react-bootstrap'

const List = () => {
    return (
        <div className="container main">
            <h1>Pick a Playlist</h1>
            <Accordion>
                <ListPart />
            </Accordion>
        </div>
    )
}

export default List