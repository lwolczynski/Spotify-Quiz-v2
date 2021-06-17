const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const filterItemsByKeys = (items, ...keys) =>
    items.map((item) => Object.fromEntries(keys.map((key) => [key, item[key]])));

export { shuffleArray, filterItemsByKeys };
