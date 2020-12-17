import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from './Loader'
import { login } from '../api/auth';

const params = (new URL(document.location)).searchParams;
const code = params.get('code');

const Login = ({ setAuthorized }) => {
    const [signingIn, setSigningIn] = useState(true)

    useEffect(() => {
        window.history.replaceState({}, document.title, '/');
        const execute = async () => {
            try {
                await login(code);
            } catch (err) {
                // do nothing
            }
            setAuthorized(true);
            setSigningIn(false);
        };
        execute();
    }, []);

    return (
        signingIn ? <Loader /> : <Redirect to='/' />
    )
}

export default Login