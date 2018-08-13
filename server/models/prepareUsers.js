const location = require('./location');
const moment   = require('moment');

module.exports = (users, session, radius = null) => {
    return users.filter(user => {
        user.location = JSON.parse(user.location);
        user.age      = moment().diff(user.bday, 'years');
        if (session.location) {
            user.distance = location.calculateDistance(
                session.location.lat,
                session.location.lng,
                user.location.lat,
                user.location.lng
            );
        }
        return !(radius && user.distance > radius);
    });
};
