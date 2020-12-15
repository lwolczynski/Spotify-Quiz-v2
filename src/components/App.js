import React, { useState } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './Header'
import Auth from './Auth'
import Main from './Main'
import List from './List'
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
                <Route path="/" exact component={authorized ? List : Main} />
                <Route path="/callback" component={() => <Login setAuthorized={setAuthorized} />} />
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;