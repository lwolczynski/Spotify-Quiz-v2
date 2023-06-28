import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import Auth from './Auth';
import Main from './Main';
import RouteHandler from './RouteHandler';
import Login from './Login';
import Footer from './Footer';
import { checkAuth } from '../api/auth';

ReactGA.initialize(process.env.REACT_APP_GA_FOUR_ID);

const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};

const App = () => {
    const [authorized, setAuthorized] = useState(checkAuth());

    useEffect(() => {
        window.addEventListener('resize', appHeight);
        appHeight();

        return () => {
            window.removeEventListener('resize', appHeight);
        };
    }, []);

    return (
        <BrowserRouter>
            <Header>
                <Auth authorized={authorized} setAuthorized={setAuthorized} />
            </Header>
            <Switch>
                <Route path="/callback" exact>
                    <Login setAuthorized={setAuthorized} />
                </Route>
                <Route path="/">{authorized ? <RouteHandler /> : <Main />}</Route>
            </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
