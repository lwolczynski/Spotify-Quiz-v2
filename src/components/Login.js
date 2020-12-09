import React, { useState, useEffect } from 'react'
import Loader from './Loader'
import Main from './Main'
import { login } from '../api/auth';

const params = (new URL(document.location)).searchParams;
const code = params.get('code');

const Login = ({ setAuthorized }) => {
    const [signingIn, setSigningIn] = useState(true)

    useEffect(() => {
        const execute = async () => {
            window.history.replaceState({}, document.title, '/');
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
        signingIn ? <Loader /> : <Main />
    )
}

export default Login