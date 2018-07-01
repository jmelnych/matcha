const hash = require('password-hash');

module.exports = (req, res) => {
    let {token, password} = req.body,
        user              = req.app.get('user'),
        error   = (e) => {
            console.log(e);
            res.send(e);
        },
        promise;

    if (token) {
        promise = user.getByUnique('token', token);

        promise.then((response) => {
            if (!response || !response.activation) {
                res.send('404');
            } else {
                req.session.remind = response.id;
                res.send('Password form');
            }
        }).catch(error);
    } else if (password) {
        promise = user.getByUnique('id', req.session.remind);

        promise.then((response) => {
            if (!response || !response.activation) {
                res.send('404');
            } else {
                promise = user.update(
                    'password', hash.generate(password),
                    'id', req.session.remind
                );
                promise.then(() => res.send('Success')).catch(error);
            }
        }).catch(error);


    }
};
