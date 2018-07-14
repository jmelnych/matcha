const multer = require('multer');

module.exports = (req, res) => {
    let save     = req.app.get('save'),
        response = multer(save.image).single('avatar'),
        db       = req.app.get('db');

    response(req, res, (err) => {
        if (err) {
            res.send(err);
        } else if (req.file) {
            let {filename} = req.file,
                promise    = db.update('users', 'avatar', filename, 'id', req.session.id);
            promise.then(() => res.send('Avatar updated')).catch(e => console.log(e));
        }
    })
};
