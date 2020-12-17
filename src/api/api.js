import axios from 'axios'
import { filterItemsByKeys, reduceToOneKey } from '../utils/utils.js';
import { refreshTokens } from './auth.js';

const getItems = async (url, initial, addMarket = false) => {
  const limit = initial ? 50 : null
  const market = initial ? (addMarket ? localStorage.getItem('market') : null) : null
  return axios({
    url,
    method: 'get',
    params: {
      limit,
      market
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
    }).then((res) => {
      return res.data;
    })
    .catch(async (err) => {
      console.log(err)
      await refreshTokens()
      return getItems(url)
    });
}

const getAllPlaylists = async (url, all = []) => {
  let newData = await getItems(url, all.length ? false : true)
  if (!newData) return
  const items = newData.items ? newData.items : newData.playlists.items;
  // Pick only relevant keys from items
  const filteredKeys = ["href", "id", "images", "name", "tracks"];
  all = all.concat(filterItemsByKeys(items, ...filteredKeys));
  return (newData.next) ? await getAllPlaylists(newData.next, all) : {"items": all};
}

const getAllTracks = async (url, isRegularPlaylist, all = []) => {
  console.log(isRegularPlaylist)
  let newData = await getItems(url, all.length ? false : true, isRegularPlaylist)
  all = all.concat(reduceToOneKey(newData.items, "track"));
  return (newData.next) ? await getAllTracks(newData.next, isRegularPlaylist, all) : {"items": all};
}

const getProfile = async () => {
  return getItems('https://api.spotify.com/v1/me', true, false)
}

export { getAllPlaylists, getAllTracks, getProfile };