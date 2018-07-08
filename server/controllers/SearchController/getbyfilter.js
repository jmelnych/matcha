module.exports = (req, res) => {
    let db           = req.app.get('db'),
        filterObject = req.app.get('filterObject'),
        data         = filterObject(req.body, [
            'gender', 'preference', 'age', 'rating', 'tags', 'location'
        ]),
        promise      = db.getAllByFilter([
            'id', 'username', 'firstname', 'lastname', 'gender', 'preference',
            'occupancy', 'age', 'rating', 'bio', 'location', 'avatar', 'added'
        ], data);

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
