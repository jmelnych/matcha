const multer = require('multer');

module.exports = {
    image : {
        storage: multer.diskStorage({
            destination: function(req, file, next) {
                console.log('destination', file);
                next(null, `./client/src/img/${file.fieldname}s`);
            },
            filename: function(req, file, next) {
                console.log('filename', file);
                const ext = file.mimetype.split('/')[1];
                next(null, `${file.fieldname}-${Date.now()}.${ext}`);
            }
        }),
        fileFilter: function (req, file, next) {
            if (!file) {
                next();
            }
            const image = file.mimetype.startsWith('image/');
            if (image) {
                next(null, true);
            } else {
                next({message: "File not supported"}, false);
            }
        }
    }
};