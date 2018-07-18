const fs = require('fs');

module.exports = (req, res) => {
    let db      = req.app.get('db'),
        rootDir = req.app.get('rootDir'),
        {name}  = req.body,
        promise = db.getByUnique('photos', 'filename', name),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        if (response) {
            promise = db.delete('photos',
                ['id', 'user_id'], [response.id, req.session.id]);
            promise.then(() => {
                fs.unlink(`${rootDir}/client/src/img/photos/${name}`);
                res.send('Deleted')
            }).catch(error);
        } else {
            res.send('404');
        }
    }).catch(error);
};
