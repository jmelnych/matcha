module.exports = (req, res) => {
    let filterObject = req.app.get('filterObject'),
        db           = req.app.get('db'),
        data     = filterObject(req.body.data, [
            'username', 'firstname', 'lastname', 'gender', 'preference',
            'occupancy', 'age', 'rating', 'bio', 'location'
        ]),
        promise      = db.updateMultiple('users', data, 'id', req.session.id);
    promise.then(() => {
        res.send('success');
    }).catch((e) => {
        res.send(e);
    });
};