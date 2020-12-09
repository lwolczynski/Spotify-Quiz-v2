import React, { useState, useEffect } from 'react'
import Main from './Main'
import { logout } from '../api/auth';

const params = (new URL(document.location)).searchParams;
const code = params.get('code');

const Logout = ({ setAuthorized }) => {

    useEffect(() => {
        window.history.replaceState({}, document.title, '/');
        logout();
        setAuthorized(false);
    }, []);

    return (
        <Main />
    )
}

export default Logout