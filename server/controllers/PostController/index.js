const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

router.post('/delete', require('./delete'));

export default router;
