import cryptoBrowserify from 'crypto-browserify';

const scopes = 'user-top-read playlist-read-collaborative playlist-read-private user-read-private user-read-email user-read-recently-played';

const access_token = window.localStorage.getItem('access_token');
const refresh_token = window.localStorage.getItem('refresh_token');
let tokens = access_token === null ? null : {
    access_token,
    refresh_token
};

const base64URLEncode = str => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = buffer => {
    return cryptoBrowserify.createHash('sha256').update(buffer).digest();
}

let storedVerifier = window.localStorage.getItem('verifier');
if (storedVerifier === null) {
    const newVerifier = base64URLEncode(cryptoBrowserify.randomBytes(32));
    window.localStorage.setItem('verifier', newVerifier);
    storedVerifier = newVerifier;
}

const verifier = storedVerifier; 
const challenge = base64URLEncode(sha256(storedVerifier));
const authorizeUrl = process.env.REACT_APP_AUTHORIZE_URL;
const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUrl = process.env.REACT_APP_REDIRECT_URL;
const tokenUrl = process.env.REACT_APP_TOKEN_URL;

export const loginUrl =
    authorizeUrl +
    '?response_type=code' +
    '&code_challenge_method=S256' +
    '&code_challenge='+ challenge +
    '&client_id=' + clientId +
    '&scope=' + encodeURIComponent(scopes) +
    '&redirect_uri=' + redirectUrl

export const refreshTokens = async refreshToken => {
    const body = `grant_type=refresh_token&client_id=${clientId}&refresh_token=${refresh_token}`;
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });
    if (!response.ok) {
        throw Error();
    }
    const { access_token, id_token } = await response.json();
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
    tokens = {
        access_token,
        refresh_token
    };
};

export const login = async code => {
    const body = `grant_type=authorization_code&client_id=${clientId}&code_verifier=${verifier}&code=${code}&redirect_uri=${redirectUrl}`;
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
    });
    if (!response.ok) {
        throw Error();
    }
    const { access_token, refresh_token } = await response.json();
    window.localStorage.setItem('access_token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
    tokens = {
        access_token,
        refresh_token
    };
};

export const logout = async () => {
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');
  window.localStorage.removeItem('activity_playlists');
  window.localStorage.removeItem('user_playlists');
  window.localStorage.removeItem('top_playlists');
  tokens = null;
};

export const getTokens = () => tokens;