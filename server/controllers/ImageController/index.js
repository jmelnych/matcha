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
router.post('/save', require('./save'));

router.post('/avatar', require('./avatar'));

router.post('/photos', require('./photos'));

export default router;

