import axios from 'axios'
import { filterItemsByKeys, reduceToOneKey } from '../utils/utils.js';

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
  await getItems(url).then((res) => {
    newData = res.data;
  });
  const items = newData.items ? newData.items : newData.playlists.items;
  // Pick only relevant keys from items
  const filteredKeys = ["href", "id", "images", "name", "tracks"];
  all = all.concat(filterItemsByKeys(items, ...filteredKeys));
  return (newData.next) ? await getAllPlaylists(newData.next, all) : {"items": all};
}

const getAllTracks = async (url, all = []) => {
//  await checkTokenValidity();
  let newData;
  await getItems(url).then((res) => {
    newData = res.data;
  });
  all = all.concat(reduceToOneKey(newData.items, "track"));
  return (newData.next) ? await getAllTracks(newData.next, all) : {"items": all};
}

// const checkTokenValidity = async () => {
//   const access_token = getCookie('access_token')
//   if (!access_token) {
//     axios({
//       url: '/refresh',
//       method: 'get'
//     }).then((res) => {
//       setCookie('access_token', res.data.access_token, res.data.max_age);
//       updateCookieExpiry('refresh_token', 3600*24);
//     })
//   }
// }

export { getAllPlaylists, getAllTracks };