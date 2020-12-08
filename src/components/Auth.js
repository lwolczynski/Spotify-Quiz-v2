import React, { useState, useEffect } from 'react'

const Auth = () => {
    const [signedIn, setSignedIn] = useState(null)

    const dec2hex = (dec) => {
        return ('0' + dec.toString(16)).substr(-2)
    }
      
    const generateRandomString = () => {
        var array = new Uint32Array(56/2);
        window.crypto.getRandomValues(array);
        return Array.from(array, dec2hex).join('');
    }
    
    const sha256 = (plain) => { // returns promise ArrayBuffer
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        return window.crypto.subtle.digest('SHA-256', data);
    }
      
    const base64urlencode = (a) => {
        var str = "";
        var bytes = new Uint8Array(a);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");
    }
      
    const challenge_from_verifier = async (v) => {
        const hashed = await sha256(v);
        const base64encoded = base64urlencode(hashed);
        return base64encoded;
    }

    // login() {
    //     const scopes = 'user-top-read playlist-read-collaborative playlist-read-private user-read-private user-read-email user-read-recently-played';
    //     res.redirect('https://accounts.spotify.com/authorize' +
    //       '?response_type=code' +
    //       '&client_id=' + process.env.client_id +
    //       (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    //       '&redirect_uri=' + encodeURIComponent(process.env.redirect_uri));
    // }

    const renderAuthButton = () => {
        if (signedIn === null) {
            return null;
        } else if (signedIn) {
            return (
                <a href="/logout">Logout</a>
            )
        } else {
            return (
                <a href="/login">Login</a>
            )
        }
    }

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    });

    return (
        <div>{renderAuthButton()}</div>
    )
}

export default Auth