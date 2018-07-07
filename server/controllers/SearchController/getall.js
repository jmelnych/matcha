module.exports = (req, res) => {
    let promise,
        users     = req.app.get('user');

        promise = users.getAll();
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
