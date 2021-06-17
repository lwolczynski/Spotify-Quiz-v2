import React from 'react';
import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Loader = () => (
    <Container className="main d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </Container>
);

export default Loader;
