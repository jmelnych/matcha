const multer = require('multer');

module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }

    let save     = req.app.get('save'),
        saveImage = multer(save.image).single('photo'),
        db       = req.app.get('db'),
        error    = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    saveImage(req, res, (err) => {
        if (err) {
            res.send(err);
        } else if (req.file) {
            let {filename} = req.file,
                promise    = db.getByUnique('users', 'id', id),
                savePhoto = () => {
                    promise = db.create('photos', 'filename, user_id', [filename, id]);
                    promise.then(() => res.send(filename)).catch(error);
                };
            promise.then((user) => {
                if (user.rating < 42) {
                    user.rating++;
                    promise = db.update('users', 'rating', user.rating, 'id', id);
                    promise.then(savePhoto).catch(error);
                } else {
                    savePhoto();
                }
            }).catch(error);
        }
    })
};
