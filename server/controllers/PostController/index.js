const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

router.post('/delete', require('./delete'));

router.post('/update', require('./update'));

export default router;
