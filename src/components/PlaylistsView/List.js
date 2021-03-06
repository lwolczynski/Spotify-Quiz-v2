import React from 'react';
import { Accordion } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import ActivityPart from './ActivityPart';
import ListPart from './ListPart';

const List = () => (
    <Container className="main">
        <h1>Pick a Playlist</h1>
        <Accordion defaultActiveKey="0">
            <ActivityPart num="0" name="Activity Based Playlists" storage="activity_playlists" />
            <ListPart
                num="1"
                name="Your Playlists"
                storage="user_playlists"
                url="https://api.spotify.com/v1/me/playlists"
            />
            <ListPart
                num="2"
                name="Spotify Top Playlists"
                storage="top_playlists"
                url="https://api.spotify.com/v1/browse/categories/toplists/playlists"
            />
        </Accordion>
    </Container>
);

export default List;
