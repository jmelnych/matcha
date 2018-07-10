const multer = require('multer');

module.exports = (req, res) => {
    console.log('api/image/save post params:', req.body);
    
    let save     = req.app.get('save'),
        response = multer(save.image).single('avatar');
    response(req, res, (err) => {
        if (err) {
            res.send(err);
        } else if (req.file) {
            res.send('Avatar saved');
        }
    })
};
