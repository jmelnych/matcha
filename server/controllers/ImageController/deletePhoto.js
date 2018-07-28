const fs = require('fs');

module.exports = (req, res) => {
    if (req.session.id === undefined) {
        res.send('Need login');
        return;
    }
    let {name} = req.body;
    if (!name) {
        res.send('Need Photo Name');
        return;
    }
    let db      = req.app.get('db'),
        rootDir = req.app.get('rootDir'),
        promise = db.delete('photos', ['filename', 'user_id'], [name, req.session.id]),
        error   = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    promise.then((response) => {
        if (response) {
            fs.unlink(`${rootDir}/client/src/img/photos/${name}`);
            res.send('Deleted')
        } else {
            res.send('404');
        }
    }).catch(error);
};
