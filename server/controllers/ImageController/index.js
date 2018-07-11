const express = require('express');
const router  = express.Router();

/*
 Expected post params:
    {name: string} - string must be only 'avatar' or 'photo'
    and picture
 Responses:
    if error:
        error object
    else:
        filename string
 */
//router.post('/save', require('./save'));

router.post('/saveavatar', require('./saveavatar'));

router.post('/savephoto', require('./savephoto'));

router.post('/getphotos', require('./getphotos'));

export default router;

