module.exports = (data, filterArray) => {
    return Object.keys(data)
        .filter(key => filterArray.includes(key))
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {});
};
