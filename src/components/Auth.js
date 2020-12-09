import React from 'react'
import { Link } from 'react-router-dom'
import { loginUrl } from '../api/auth';

const Auth = ({ authorized }) => {

    const renderAuthButton = () => {
        if (authorized === null) {
            return null;
        } else if (authorized) {
            return (
                <Link to="/logout">Logout</Link>
            )
        } else {
            return (
                <a href={loginUrl}>Login</a>
            )
        }
    }

    return (
        <div id="auth_control">{renderAuthButton()}</div>
    )
}

export default Auth