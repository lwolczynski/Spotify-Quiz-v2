import React, { useState } from 'react'
import { BrowserRouter, MemoryRouter, Route, Redirect, Switch } from 'react-router-dom'
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

    return (
        <>
            <BrowserRouter>
                <Header>
                    <Auth authorized={authorized} setAuthorized={setAuthorized} />
                </Header>
                <Switch>
                    <Route path="/callback" component={() => <Login setAuthorized={setAuthorized} />} />
                    <MemoryRouter>
                        <Route path="/" exact>
                            {authorized ? <List /> : <Main />}
                        </Route>
                        <Route path="/play" exact>
                            {authorized ? <Game /> : <Redirect to="/" />}
                        </Route>
                    </MemoryRouter>
                </Switch>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;