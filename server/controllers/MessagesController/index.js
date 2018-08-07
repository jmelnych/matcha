const express = require('express');
const router  = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

export default router;