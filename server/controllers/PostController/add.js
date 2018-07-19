module.exports = (req, res) => {
    let db            = req.app.get('db'),
        {title, post} = req.body,
        promise       = db.getAllByUnique('posts', ['user_id'], req.session.id),
        filterObject  = req.app.get('filterObject'),
        error         = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (response && response.length < 5) {
            promise = db.create('posts', 'user_id, title, post', [req.session.id, title, post]);
            promise.then((post_id) => {
                promise = db.getByUnique('posts', 'id', post_id);
                promise.then(last_res => res.send(
                    filterObject(last_res, ['id', 'title', 'post', 'added']))).catch(error);
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
