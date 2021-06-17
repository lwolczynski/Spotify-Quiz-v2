import React from 'react';
import Button from 'react-bootstrap/Button';
import { loginUrl, logout } from '../api/auth';

const Auth = ({ authorized, setAuthorized }) => {
    const renderAuthButton = () => {
        if (authorized === null) {
            return null;
        }
        if (authorized) {
            return (
                <Button
                    variant="link"
                    className="btn-auth"
                    onClick={() => {
                        logout();
                        setAuthorized(false);
                    }}
                >
                    Logout
                </Button>
            );
        }
        return (
            <Button
                variant="link"
                className="btn-auth"
                onClick={() => {
                    window.location.href = loginUrl;
                }}
            >
                Login
            </Button>
        );
    };

    return <>{renderAuthButton()}</>;
};

export default Auth;
