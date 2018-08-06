const express = require('express');
const router  = express.Router();

router.post('/add', require('./add'));

router.post('/activate', require('./activate'));

router.post('/get', require('./get'));

router.post('/history', require('./history'));

router.post('/password', require('./password'));

router.post('/update-password', require('./updatePassword'));

router.post('/remind', require('./remind'));

router.post('/resend', require('./resend'));

router.post('/update', require('./update'));

router.post('/logout', require('./logout'));

router.post('/get-matches', require('./getMatches'));

export default router;
