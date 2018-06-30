const express = require('express');

const router = express.Router();

router.get('/activate/:token', require('./activate'));

router.post('/password', require('./password'));

router.post('/remind', require('./remind'));

router.post('/resend', require('./resend'));

router.post('/get', require('./get'));

router.post('/add', require('./add'));

router.post('/update', require('./update'));

export default router;
