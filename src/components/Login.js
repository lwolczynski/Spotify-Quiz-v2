import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Loader from './Loader'
import { login } from '../api/auth'
import { getProfile } from '../api/api'

const params = (new URL(document.location)).searchParams
const code = params.get('code')

const Login = ({ setAuthorized }) => {
    const [signingIn, setSigningIn] = useState(true)

    useEffect(() => {
        window.history.replaceState({}, document.title, '/')
        const execute = async () => {
            try {
                await login(code)
                const profile = await getProfile()
                window.localStorage.setItem('market', profile.country)
                setAuthorized(true)
            } catch (err) {
                // do nothing
            }
            setSigningIn(false)
        };
        execute();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        signingIn ? <Loader /> : <Redirect to='/' />
    )
}

export default Login