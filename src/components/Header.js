import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';

const Header = ({ children }) => (
    <Navbar className="py-0 container flex-shrink-0">
        <Navbar.Brand className="mr-auto">
            <Link to="/" className="navbar-brand">
                <img
                    src="/favicon.ico"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt=""
                />{' '}
                SpotiQuiz
            </Link>
        </Navbar.Brand>
        {children}
    </Navbar>
);

export default Header;
