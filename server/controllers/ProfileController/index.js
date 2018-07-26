const express = require('express');
const router = express.Router();

router.post('/get', require('./get'));

export default router;
