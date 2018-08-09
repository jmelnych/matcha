const express = require('express');
const router = express.Router();

router.post('/get-by-filter', require('./getByFilter'));

router.post('/match', require('./match'));

export default router;
