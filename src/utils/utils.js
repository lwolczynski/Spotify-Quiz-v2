const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const filterItemsByKeys = (items, ...keys) => {
  let filtered = [];
  for (let item of items) {
    const filteredItem = keys
      .reduce((obj, key) => ({ ...obj, [key]: item[key] }), {});
    filtered = filtered.concat(filteredItem);
  }
  return filtered;
}

const reduceToOneKey = (items, key) => {
  let filtered = [];
  for (let item of items) {
    filtered = item.hasOwnProperty(key) ? filtered.concat(item[key]) : filtered.concat(item);
  }
  return filtered;
}


export { shuffleArray, filterItemsByKeys, reduceToOneKey };