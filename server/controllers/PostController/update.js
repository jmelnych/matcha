module.exports = (req, res) => {
    console.log(req.body);
    let filterObject = req.app.get('filterObject'),
        db           = req.app.get('db'),
        post_id      = req.body.id,
        data     = filterObject(req.body, ['title', 'post']),
        promise      = db.updateMultiple('posts', data, 'id', post_id);
    promise.then(() => {
        res.send('success');
    }).catch((e) => {
        res.send(e);
    });
};