module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }
    let filterObject = req.app.get('filterObject'),
        db           = req.app.get('db'),
        data         = filterObject(req.body.data, [
            'username', 'firstname', 'lastname', 'gender', 'preference',
            'personality', 'occupancy', 'age', 'rating', 'bio', 'location'
        ]);
    if (data.location) {
        req.session.location = data.location;
        data.location = JSON.stringify(data.location);
    }
    if (Object.keys(data).length) {
        let promise = db.updateMultiple('users', data, 'id', req.session.id);
        promise.then(() => {
            res.send('success');
        }).catch((e) => {
            res.send(e);
        });
    }
};
