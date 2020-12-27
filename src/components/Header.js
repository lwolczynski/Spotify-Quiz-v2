import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'

const Header = ({ children }) => {

    return (
        <Navbar className="py-0 container" >
            <Navbar.Brand className="mr-auto">
                <Link to="/" className="navbar-brand">
                    <img src="/favicon.ico" width="30" heigth="30" className="d-inline-block align-top" alt="" />
                    {' '}
                    SpotiQuiz
                </Link>
            </Navbar.Brand>
            { children }
        </Navbar>
    )
}

export default Header