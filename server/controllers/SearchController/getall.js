module.exports = (req, res) => {
    let promise,
        db = req.app.get('db');

    promise = db.getAll('users');
    promise.then((response) => {
        if (response === undefined) {
            res.send('No users');
        } else {
            res.send(response);
        }
    }).catch((e) => {
        res.send(e);
    });
};
