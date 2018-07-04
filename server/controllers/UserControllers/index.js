const express = require('express');
const multer = require('multer');
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


const multerConfig  = require('../../multerConfig');

router.post('/saveimg', multer(multerConfig.avatarMulterConfig).single('avatar'), require('./saveimg'));
router.post('/savephoto', multer(multerConfig.photoMulterConfig).single('photo'), require('./saveimg'));

router.post('/avatar', require('./avatar'));
router.post('/photos', require('./photos'));

export default router;
