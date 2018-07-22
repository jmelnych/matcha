const hash        = require('password-hash');
const randomToken = require('random-token');
const moment      = require('moment');

const getLocation = geo =>
    geo ? JSON.stringify({
        city: geo.city,
        country: geo.country,
        lat: geo.location.latitude,
        lng: geo.location.longitude
    }) : '';

module.exports = async (req, res) => {
    let token    = randomToken(16),
        db       = req.app.get('db'),
        mail     = req.app.get('mail'),
        location = req.app.get('location'),
        data     = (({email, username, firstname, lastname, password, gender, bday}) =>
            ({email, username, firstname, lastname, password, gender, bday}))(req.body);

    data.bday     = moment(data.bday).format();
    data.password = hash.generate(data.password);
    data.token    = token;
    data.location = getLocation(await location.get(req.connection.remoteAddress));

    let columns = Object.keys(data).join(', '),
        values  = Object.values(data),
        promise = db.create('users', columns, values);

    promise.then(() => {
        mail.send(data.email, data.username, token,
            (err, info) => console.log(err ? err : info));
        res.send('Mail has been sent');
    }).catch((e) => {
        if (e.errno === 19) {
            res.send('Email exists');
        } else {
            res.send(e);
        }
    });
};
