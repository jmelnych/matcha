const hash = require('password-hash');

module.exports = (req, res) => {
    let {token, password} = req.body,
        db                = req.app.get('db'),
        error             = (e) => {
            console.log(e);
            res.send(e);
        },
        promise           = token ?
            db.getByUnique('users', 'token', token) :
            db.getByUnique('users', 'id', req.session.id);

    promise.then((response) => {
        console.log('body', req.body);
        console.log('resp', response);
        if (!response || !response.activation || !password) {
            res.send('404');
        } else if (!token) {
            res.send(hash.verify(password, response.password) ? 'ok' : 'ko')
        } else {
            promise = db.update('users',
                'password', hash.generate(password),
                'id', response.id
            );
            promise.then(() => res.send('Success')).catch(error);
        }
    }).catch(error);
};
