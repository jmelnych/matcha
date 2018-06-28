const randomToken = require('random-token');

module.exports = (req, res) => {
    let token   = randomToken(16),
        user    = req.app.get('user'),
        mail    = req.app.get('mail'),
        {email} = req.body,
        promise = user.getByUnique('email', email);

    promise.then((response) => {
        if (!response || response.activation) {
            res.send('No');
        } else {
            let username = response.username;

            promise = user.update('token', token, 'email', email);
            promise.then(() => {
                mail.resend(email, username, token, (err, info) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(info);
                    }
                });
                res.send('Resend');
            }).catch((e) => {
                console.log(e);
                res.send(e);
            });
        }
    }).catch((e) => {
        console.log(e);
        res.send(e);
    });
};
