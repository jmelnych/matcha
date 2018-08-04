const multer = require('multer');

module.exports = (req, res) => {
    let id = req.session.id;
    if (id === undefined) {
        res.send('Need login');
        return;
    }

    let save      = req.app.get('save'),
        saveImage = multer(save.image).single('avatar'),
        db        = req.app.get('db'),
        error     = (e) => {
            console.log(e);
            res.send(e);
        };

    saveImage(req, res, (err) => {
        if (err) {
            res.send(err);
        } else if (req.file) {
            let {filename} = req.file,
                promise    = db.getByUnique('users', 'id', id);
            promise.then((user) => {
                if (user.rating < 42 && user.avatar === 'default.png') {
                    user.rating++;
                }
                promise = db.updateMultiple('users', {
                    rating: user.rating,
                    avatar: filename,
                }, 'id', id);
                promise.then(() => res.send('Avatar updated')).catch(error);
            }).catch(error);
        }
    })
};
