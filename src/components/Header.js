import React from 'react'
import { useHistory } from 'react-router-dom';

const Header = ({ children }) => {

    const history = useHistory();

    return (
        <nav className="navbar navbar-light">
            <div onClick={() => history.push('/')} className="navbar-brand">
                <img src="/favicon.ico" width="30" height="30" className="d-inline-block align-top margin-right-short" alt="" />
                SpotiQuiz
            </div>
            { children }
        </nav>
    )
}

export default Header