module.exports = (req, res) => {
    let {token} = req.body,
        db      = req.app.get('db'),
        promise = db.getByUnique('users', 'token', token),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (!response || response.activation) {
            res.send('404');
        } else {
            promise = db.update('users', 'activation', 1, 'token', token);
            promise.then(() => res.send('Your email has been confirmed')).catch(error);
        }
    }).catch(error);
};
