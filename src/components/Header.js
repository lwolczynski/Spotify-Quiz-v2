import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ children }) => {

    return (
        <nav className="navbar navbar-light">
            <Link to="/" className="navbar-brand">
                <img src="/favicon.ico" width="30" height="30" className="d-inline-block align-top margin-right-short" alt="" />
                SpotiQuiz
            </Link>
            { children }
        </nav>
    )
}

export default Header