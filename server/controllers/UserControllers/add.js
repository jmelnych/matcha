const hash        = require('password-hash');
const randomToken = require('random-token');

module.exports = (req, res) => {
    const {email, username, firstname, lastname, password, gender} = req.body;

    let token   = randomToken(16),
        user    = req.app.get('user'),
        mail    = req.app.get('mail'),
        promise = user.create(
            email,
            username,
            firstname,
            lastname,
            hash.generate(password),
            token,
            gender);

    promise.then(() => {
        mail.send(email, username, token, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
        res.send('success');
    }).catch((e) => {
        if (e.errno === 19) {
            res.send('email exists');
        }
    });
};
