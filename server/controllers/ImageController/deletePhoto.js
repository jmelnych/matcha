const fs = require('fs');

module.exports = (req, res) => {
    let id     = req.session.id,
        rootDir = req.app.get('rootDir') + '/server/public/photos/',
        {name} = req.body;
    if (id === undefined) {
        res.send('Need login');
        return;
    }
    if (!name || !fs.existsSync(`${rootDir}${name}`)) {
        res.send('Need Photo Name');
        return;
    }

    let db      = req.app.get('db'),
        promise = db.delete('photos', ['filename', 'user_id'], [name, id]),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        if (response) {
            fs.unlink(`${rootDir}${name}`);
            promise = db.getByUnique('users', 'id', id);
            promise.then((user) => {
                if (user.rating > 0) {
                    user.rating--;
                    promise = db.update('users', 'rating', user.rating, 'id', id);
                    promise.then(() => res.send('Deleted')).catch(error);
                } else {
                    res.send('Deleted');
                }
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
