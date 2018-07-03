const express = require('express');

const router = express.Router();

/*
 Expected post params:
    {token: string}
 Responses:
    if error:
        error object
    else if (token valid) and (profile not activated):
        "Your email has been confirmed"
    else:
        "404"
 */
router.post('/activate', require('./activate'));

/*
 Expected post params:
    {token: string} or {password: string}
 Responses for token:
    if error:
        error object
    else if (token valid) and (profile activated):
        "Password form"
    else:
        "404"
 Responses for password:
    if error:
        error object
    else if (profile from cookie activated):
        "Success"
    else:
        "404"
 */
router.post('/password', require('./password'));

/*
 Expected post params:
    {email: string}
 Responses:
    if error:
        error object
    else if (no profile with this email):
        "No user"
    else if (profile not activated):
        "No activation"
    else:
        "Mail has been sent"
 */
router.post('/remind', require('./remind'));

/*
 Expected post params:
    {email: string}
 Responses:
    if error:
        error object
    else if (profile not activated):
        "Mail has been sent"
    else:
        "404"
 */
router.post('/resend', require('./resend'));

/*
 Expected post params or cookie:
    {email: string, password: string}
 Responses:
    if error:
        error object
    else if (no profile with this email):
        "No user"
    else if (invalid password):
        "Wrong password"
    else if (profile not activated):
        "No activation"
    else:
        profile object
 */
router.post('/get', require('./get'));

/*
 Expected post params or cookie:
    {email: string, password: string}
 Responses:
    if error:
        error object
    else if (profile with this email exist):
        "Email exists"
    else:
        "Mail has been sent"
 */
router.post('/add', require('./add'));

router.post('/update', require('./update'));

const multer = require('multer');
const multerConfig = {
    storage: multer.diskStorage({
        destination: function(req, file, next) {
            next(null, './client/src/img/avatars');
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
};

router.post('/saveimg', multer(multerConfig).single('avatar'), require('./saveimg'));

router.post('/avatar', require('./avatar'));

export default router;
