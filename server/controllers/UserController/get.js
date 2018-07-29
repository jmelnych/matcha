const hash   = require('password-hash');
const moment = require('moment');

module.exports = (req, res) => {
    let promise,
        email,
        password = null,
        db       = req.app.get('db');

    if (req.session.email) {
        email = req.session.email;
    } else {
        email    = req.body.email;
        password = req.body.password;
    }
    promise = db.getByUnique('users', 'email', email);

    promise.then((response) => {
        if (response === undefined) {
            res.send('No user');
        } else if (password && !hash.verify(password, response.password)) {
            res.send('Wrong password');
        } else if (!response.activation) {
            res.send('No activation');
        } else {
            response.location = JSON.parse(response.location);
            response.age      = moment().diff(response.bday, 'years');
            delete response.activation;
            delete response.password;
            delete response.token;

            req.session.email    = email;
            req.session.id       = response.id;
            req.session.location = response.location;

            res.send(response);
        }
    }).catch((e) => {
        res.send(e);
    });
};
