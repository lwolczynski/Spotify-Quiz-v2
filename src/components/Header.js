import React from 'react'
import Auth from './Auth'

const Header = () => {
    return (
        <nav className="navbar navbar-light">
            <a className="navbar-brand" href="#">
                <img src="/img/SpotiQuiz_150px.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                SpotiQuiz
            </a>
            <Auth />
        </nav>
    )
}

export default Header