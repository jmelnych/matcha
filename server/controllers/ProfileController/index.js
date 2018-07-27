const express = require('express');
const router = express.Router();

router.post('/get', require('./get'));

router.post('/fake-notification', require('./fake'));

router.post('/like', require('./like'));

export default router;
