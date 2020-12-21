import React from 'react'
import { useHistory, Link } from 'react-router-dom';

const Header = ({ children }) => {

    const history = useHistory();

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