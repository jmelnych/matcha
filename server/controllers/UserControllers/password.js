const hash = require('password-hash');

module.exports = (req, res) => {
    let {token, password} = req.body,
        user              = req.app.get('user'),
        error             = (e) => {
            console.log(`password/${req.session.remind}`, e);
            res.send('Something went wrong');
        },
        promise;

    if (token) {
        promise = user.getByUnique('token', token);

        promise.then((response) => {
            if (!response || !response.activation) {
                res.send('404');
            } else {
                req.session.remind = response.email;
                res.send('password form');
            }
        }).catch(error);
    } else if (password) {
        promise = user.getByUnique('email', req.session.remind);

        promise.then((response) => {
            if (!response || !response.activation) {
                res.send('404');
            } else {
                promise = user.update(
                    'password',
                    hash.generate(password),
                    'email',
                    req.session.remind);
                promise.then(() => res.send('success')).catch(error);
            }
        }).catch(error);


    }
};
