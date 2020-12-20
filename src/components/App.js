import React, { useState } from 'react'
import { MemoryRouter, Route, Redirect, Switch } from 'react-router-dom'
import Header from './Header'
import Auth from './Auth'
import Main from './Main'
import List from './PlaylistsView/List'
import Game from './Game/Game'
import Login from './Login'
import Footer from './Footer'
import { checkAuth } from '../api/auth';

const App = () => {
    const [authorized, setAuthorized] = useState(checkAuth())
    let callback = false

    if (window.location.pathname === "/callback/") {
        callback = true
    }

    return (
        <>
            <MemoryRouter>
                <Header>
                    <Auth authorized={authorized} setAuthorized={setAuthorized} />
                </Header>
                {
                    callback ? <Login setAuthorized={setAuthorized} /> :
                    <Switch>
                        <Route path="/" exact>
                            {authorized ? <List /> : <Main />}
                        </Route>
                        <Route path="/play" exact>
                            {authorized ? <Game /> : <Redirect to="/" />}
                        </Route>
                    </Switch>
                }
                <Footer />
            </MemoryRouter>
        </>
    )
}

export default App;