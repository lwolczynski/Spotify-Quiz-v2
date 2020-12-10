import React, { useState } from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Header from './Header'
import Auth from './Auth'
import Main from './Main'
import List from './List'
import Login from './Login'
import Logout from './Logout'
import Footer from './Footer'
import { getTokens } from '../api/auth';

const tokens = getTokens();

const App = () => {
    const [authorized, setAuthorized] = useState(tokens !== null)

    return (
        <>
            <BrowserRouter>
                <Header>
                    <Auth authorized={authorized} />
                </Header>
                <Route path="/" exact component={Main} />
                <Route path="/list" exact component={List} />
                <Route path="/callback" component={() => <Login setAuthorized={setAuthorized} />} />
                <Route path="/logout" component={() => <Logout setAuthorized={setAuthorized} />} />
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;