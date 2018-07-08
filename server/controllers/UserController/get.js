const hash = require('password-hash');

module.exports = (req, res) => {
    let promise,
        email,
        password = 0,
        db     = req.app.get('db');

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
            req.session.email = email;
            req.session.id = response.id;
            delete response.activation;
            delete response.password;
            delete response.token;
            res.send(response);
        }
    }).catch((e) => {
        res.send(e);
    });
};