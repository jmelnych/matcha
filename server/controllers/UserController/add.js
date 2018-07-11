const hash        = require('password-hash');
const randomToken = require('random-token');

module.exports = (req, res) => {
    //console.log(req.body);
    let token = randomToken(16),
        db  = req.app.get('db'),
        mail  = req.app.get('mail'),
        data  = (({email, username, firstname, lastname, password, gender, bday}) =>
                 ({email, username, firstname, lastname, password, gender, bday}))(req.body);

    data.password = hash.generate(data.password);
    data['token'] = token;

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
