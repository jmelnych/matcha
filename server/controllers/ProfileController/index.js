const express = require('express');
const router = express.Router();

router.post('/get', require('./get'));

router.post('/see', require('./see'));

router.post('/like', require('./like'));

router.post('/unlike', require('./unlike'));

router.post('/fake', require('./fake'));

router.post('/ban', require('./ban'));

router.post('/unban', require('./unban'));

export default router;
