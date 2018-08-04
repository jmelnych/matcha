module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }

    let db            = req.app.get('db'),
        {title, post} = req.body,
        promise       = db.getAllByUnique('posts', ['user_id'], id),
        filterObject  = req.app.get('filterObject'),
        error         = (e) => {
            console.log(e);
            res.send(e);
        };

    promise.then((response) => {
        if (response && response.length < 5) {
            promise = db.create('posts', 'user_id, title, post', [id, title, post]);
            promise.then((post_id) => {
                promise = db.getByUnique('posts', 'id', post_id);
                promise.then(last_res => {
                    promise = db.getByUnique('users', 'id', id);
                    promise.then((user) => {
                        if (user.rating < 42) {
                            user.rating++;
                            promise = db.update('users', 'rating', user.rating, 'id', id);
                            promise.then(() => res.send(filterObject(last_res, ['id', 'title', 'post', 'added']))).catch(error);
                        } else {
                            res.send(filterObject(last_res, ['id', 'title', 'post', 'added']));
                        }
                    }).catch(error);
                }).catch(error);
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
