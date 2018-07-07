module.exports = (req, res) => {
    let {token} = req.body,
        user    = req.app.get('user'),
        promise = user.getByUnique('token', token),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };
        console.log(token);
    promise.then((response) => {
        if (!response || response.activation) {
            res.send('404');
        } else {
            promise = user.update('activation', 1, 'token', token);
            promise.then(() => res.send('Your email has been confirmed')).catch(error);
        }
    }).catch(error);
};
