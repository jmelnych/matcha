module.exports = (req, res) => {
    let user_id   = req.session.id,
        {post_id} = req.body;
    if (user_id === undefined) {
        res.send('Need login');
        return;
    }
    if (!post_id) {
        res.send('Need Post Id');
        return;
    }

    let db      = req.app.get('db'),
        promise = db.delete('posts', ['id', 'user_id'], [post_id, user_id]),
        error   = (e) => {
            console.log(e);
            res.send(e);
        };
    promise.then(() => {
        promise = db.getByUnique('users', 'id', user_id);
        promise.then((user) => {
            if (user.rating > 0) {
                user.rating--;
                promise = db.update('users', 'rating', user.rating, 'id', user_id);
                promise.then(() => res.send('Deleted')).catch(error);
            } else {
                res.send('Deleted');
            }
        }).catch(error);
    }).catch(error);
};
