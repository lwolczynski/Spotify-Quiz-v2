import axios from 'axios'
import { filterItemsByKeys, reduceToOneKey } from '../utils/utils.js';
import { refreshTokens } from './auth.js';

const getItems = (url) => {
  return axios({
    url,
    method: 'get',
    params: {
      limit: 50
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
  })
}

const getAllPlaylists = async (url, all = []) => {
//  await checkTokenValidity();
  let newData;
  await getItems(url)
    .then((res) => {
      newData = res.data;
    })
    .catch(async (err) => {
      console.log(err)
      await refreshTokens()
      return getAllPlaylists(url, all)
    });
  if (!newData) return
  const items = newData.items ? newData.items : newData.playlists.items;
  // Pick only relevant keys from items
  const filteredKeys = ["href", "id", "images", "name", "tracks"];
  all = all.concat(filterItemsByKeys(items, ...filteredKeys));
  return (newData.next) ? await getAllPlaylists(newData.next, all) : {"items": all};
}

const getAllTracks = async (url, all = []) => {
//  await checkTokenValidity();
  let newData;
  await getItems(url)
    .then((res) => {
      newData = res.data;
    })
    .catch((err) => {
      console.log(err)
    });
  all = all.concat(reduceToOneKey(newData.items, "track"));
  return (newData.next) ? await getAllTracks(newData.next, all) : {"items": all};
}

export { getAllPlaylists, getAllTracks };