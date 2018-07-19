module.exports = (req, res) => {
    let db      = req.app.get('db'),
        {name}  = req.body,
        promise = db.getByUnique('tags', 'tag', name),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        if (response) {
            if (req.route.path === '/add-to-user') {
                promise = db.create('users_tags',
                    'user_id, tag_id',
                    [req.session.id, response.id]);
                promise.then(() => res.send('Tag added')).catch(error);
            } else if (req.route.path === '/delete-from-user') {
                promise = db.delete('users_tags',
                    ['user_id', 'tag_id'],
                    [req.session.id, response.id]);
                promise.then(() => res.send('Tag deleted')).catch(error);
            }
        } else {
            res.send('404');
        }
    }).catch(error);
};
