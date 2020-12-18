import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Header = ({ children }) => {

    const [clicked, setClicked] = useState(false)

    return (
        // clicked ? <Redirect to="/" /> :
        <nav className="navbar navbar-light">
            <div onClick={() => setClicked(true)} className="navbar-brand">
                <img src="/favicon.ico" width="30" height="30" className="d-inline-block align-top margin-right-short" alt="" />
                SpotiQuiz
            </div>
            { children }
        </nav>
    )
}

export default Header