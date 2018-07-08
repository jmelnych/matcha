const hash = require('password-hash');

module.exports = (req, res) => {
    let {token, password} = req.body,
        db                = req.app.get('db'),
        promise           = db.getByUnique('users', 'token', token),
        error             = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (!response || !response.activation || !password) {
            res.send('404');
        } else {
            promise = db.update('users',
                'password', hash.generate(password),
                'id', response.id
            );
            promise.then(() => res.send('Success')).catch(error);
        }
    }).catch(error);
};
