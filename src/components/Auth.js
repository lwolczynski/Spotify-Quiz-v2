import React from 'react'
import { Redirect } from 'react-router-dom'
import { loginUrl, logout } from '../api/auth';
import Button from 'react-bootstrap/Button'

const Auth = ({ authorized, setAuthorized }) => {

    const renderAuthButton = () => {
        if (authorized === null) {
            return null;
        } else if (authorized) {
            return (
                <Button variant="link" onClick={() => {
                    window.history.replaceState({}, document.title, '/');
                    logout();
                    setAuthorized(false);
                    <Redirect to='/' />
                }}>Logout</Button>
            )
        } else {
            return (
                <Button variant="link" onClick={() => {
                    window.location.href = loginUrl
                }}>Login</Button>
            )
        }
    }

    return (
        <div id="auth_control">{renderAuthButton()}</div>
    )
}

export default Auth