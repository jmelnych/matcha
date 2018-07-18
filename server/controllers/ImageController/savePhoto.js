const multer = require('multer');

module.exports = (req, res) => {
    let save     = req.app.get('save'),
        response = multer(save.image).single('photo'),
        db       = req.app.get('db'),
        error    = (e) => {
            console.log('error: ', e);
            res.send(e);
        };

    response(req, res, (err) => {
        if (err) {
            res.send(err);
        } else if (req.file) {
            let {filename} = req.file,
                promise    = db.create('photos', 'filename, user_id', [filename, req.session.id]);
            promise.then(() => res.send('Photo saved')).catch(error);
        }
    })
};
