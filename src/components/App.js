import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={Main} />
                {/* <Route path="/play" component={Game} /> */}
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;