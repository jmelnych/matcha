const express = require('express');
const router  = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

router.post('/read', require('./read'));

export default router;