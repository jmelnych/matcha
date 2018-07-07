const randomToken = require('random-token');

module.exports = (req, res) => {
    let token   = randomToken(16),
        {email} = req.body,
        user    = req.app.get('user'),
        mail    = req.app.get('mail'),
        promise = user.getByUnique('email', email),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (!response) {
            res.send('No user');
        } else if (!response.activation) {
            res.send('No activation');
        } else {
            let username = response.username;

            promise = user.update('token', token, 'email', email);
            promise.then(() => {
                mail.remind(email, username, token, (err, info) => console.log(err ? err : info));
                res.send('Mail has been sent');
            }).catch(error);
        }
    }).catch(error);
};
