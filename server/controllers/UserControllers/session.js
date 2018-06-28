module.exports = (req, res) => {
    if (req.session.email) {
        let user    = req.app.get('user'),
            promise = user.getByUnique('email', req.session.email);

        promise.then((response) => {
            if (response === undefined) {
                res.send('no user');
            }
        }).catch((e) => {
            res.send(e);
        });
    } else {
        res.send('no session');
    }
};
