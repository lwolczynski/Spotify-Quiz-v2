import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <div className="row flex-fill justify-content-center align-items-center">
                    <img src="/img/SpotiQuiz_630px.png" width="450" height="450" className="d-inline-block align-top" alt="" />
                </div>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App;