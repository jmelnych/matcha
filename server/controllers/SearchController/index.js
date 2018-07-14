const express = require('express');
const router = express.Router();

router.post('/get-all', require('./getAll'));

router.post('/get-by-filter', require('./getByFilter'));

export default router;
