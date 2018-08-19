module.exports = (req, res) => {
    let db           = req.app.get('db'),
        promise      = db.getAllByUnique('photos', 'user_id', req.session.id),
        filterObject = req.app.get('filterObject');

    promise.then(response => {res.send(response.map(value => filterObject(value, ['filename'])))})
        .catch((e) => {
            console.log(e);
            res.send(e);
        });
};
