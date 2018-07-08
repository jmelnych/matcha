const hash        = require('password-hash');
const randomToken = require('random-token');

module.exports = (req, res) => {
    let token = randomToken(16),
        db  = req.app.get('db'),
        mail  = req.app.get('mail'),
        data  = (({email, username, firstname, lastname, password, gender}) =>
            ({email, username, firstname, lastname, password, gender}))(req.body);

    data.password = hash.generate(data.password);

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