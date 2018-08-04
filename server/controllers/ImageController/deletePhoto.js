const fs = require('fs');

module.exports = (req, res) => {
    let id     = req.session.id,
        {name} = req.body;
    if (id === undefined) {
        res.send('Need login');
        return;
    }
    if (!name) {
        res.send('Need Photo Name');
        return;
    }

    let db      = req.app.get('db'),
        rootDir = req.app.get('rootDir'),
        promise = db.delete('photos', ['filename', 'user_id'], [name, id]),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        if (response) {
            fs.unlink(`${rootDir}/client/src/img/photos/${name}`);
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
