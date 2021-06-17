import axios from 'axios';
import { filterItemsByKeys } from '../utils/utils';
import { refreshTokens } from './auth';

const getItems = async (url, initial, addMarket = false) => {
    const limit = initial ? 50 : null;
    const market = !initial && addMarket ? localStorage.getItem('market') : null;
    return axios({
        url,
        method: 'get',
        params: {
            limit,
            market,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    })
        .then((res) => res.data)
        .catch(async () => {
            await refreshTokens();
            return getItems(url, initial, addMarket);
        });
};

const getAllPlaylists = async (url, all = []) => {
    const newData = await getItems(url, !all.length);
    if (!newData) return {};
    const items = newData.items ? newData.items : newData.playlists.items;
    // Pick only relevant keys from items
    const filteredKeys = ['href', 'id', 'images', 'name', 'tracks'];
    all = all.concat(filterItemsByKeys(items, ...filteredKeys));
    return newData.next ? getAllPlaylists(newData.next, all) : { items: all };
};

const getAllTracks = async (url, playlistType, all = []) => {
    const newData = await getItems(url, !all.length, playlistType === 'regular');
    const tracks = playlistType === 'top' ? newData.items : newData.items.map((e) => e.track);
    // Pick only tracks with preview
    all = all.concat(tracks.filter((e) => e.preview_url));
    return newData.next ? getAllTracks(newData.next, playlistType, all) : { items: all };
};

const getProfile = async () => getItems('https://api.spotify.com/v1/me', true);

export { getAllPlaylists, getAllTracks, getProfile };
