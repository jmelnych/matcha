const hash = require('password-hash');

module.exports = (req, res) => {
    let {password} = req.body,
        db         = req.app.get('db'),
        promise    = db.update(
            'users',
            'password', hash.generate(password),
            'id', req.session.id
        );

    promise.then(() => res.send('Password updated'))
        .catch((e) => {
            console.log(e);
            res.send(e);
        });
};
