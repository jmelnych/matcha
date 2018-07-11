const multer = require('multer');

module.exports = {
    image : {
        storage: multer.diskStorage({
            destination: function(req, file, next) {
                next(null, `./client/src/img/${file.fieldname}s`);
            },
            filename: function(req, file, next) {
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
