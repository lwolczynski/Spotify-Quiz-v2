import React, { useEffect } from 'react'

const Main = () => {

    useEffect(() => {
        window.history.replaceState({}, document.title, '/');
    }, []);

    return (
        <div className="row flex-fill justify-content-center align-items-center">
            <img src="logo512.png" width="450" height="450" className="d-inline-block align-top" alt="" />
        </div>
    )
}

export default Main