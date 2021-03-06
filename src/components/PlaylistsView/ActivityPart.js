import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Tile from './Tile';

import personalized_playlists from './PersonalizedPlaylists';

const ActivityPart = ({ name, num, storage }) => {
    const [playlists, setPlaylists] = useState(() => {
        try {
            const savedData = window.localStorage.getItem(storage);
            return JSON.parse(savedData).items;
        } catch (err) {
            return [];
        }
    });

    const fetchPlaylists = () => {
        window.localStorage.setItem(storage, JSON.stringify(personalized_playlists));
        setPlaylists(personalized_playlists.items);
    };

    useEffect(() => {
        if (localStorage.getItem(storage) === null) fetchPlaylists();
    }, []);

    const renderTiles = () =>
        playlists.map((item) => {
            const img = item.images[0].url;
            return (
                <Tile
                    img={img}
                    name={item.name}
                    tracks={item.tracks.href}
                    key={item.id}
                    playlistType={item.playlistType}
                />
            );
        });

    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={num}>
                <h5 className="mb-0">
                    <Button variant="link">{name}</Button>
                </h5>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={num}>
                <ul className="card-body album-container">{renderTiles()}</ul>
            </Accordion.Collapse>
        </Card>
    );
};

export default ActivityPart;
