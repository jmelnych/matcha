module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }
    let {id} = req.body;
    if (!id) {
        res.send('Need Post Id');
        return;
    }
    let filterObject = req.app.get('filterObject'),
        db           = req.app.get('db'),
        data         = filterObject(req.body, ['title', 'post']),
        promise      = db.updateMultiple('posts', data, 'id', id);
    promise.then(() => {
        res.send('success');
    }).catch((e) => {
        res.send(e);
    });
};
