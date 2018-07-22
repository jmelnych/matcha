const axios      = require('axios');
const geoip = require('geo-from-ip');

module.exports = {
    get: (ip) => new Promise((resolve) => {
        if (ip === '::1') {
            axios.get('http://icanhazip.com/')
                .then(response => resolve(geoip.allData(response.data.trim())))
                .catch(err => resolve(err));
        } else {
            resolve(geoip.allData(ip));
        }
    }),
    calculateDistance: (lat1, lng1, lat2, lng2) => {
        let radlat1  = Math.PI * lat1 / 180;
        let radlat2  = Math.PI * lat2 / 180;
        let radtheta = Math.PI * (lng1 - lng2) / 180;
        let dist     = Math.sin(radlat1) * Math.sin(radlat2) +
            Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist) * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return dist
    }
};
