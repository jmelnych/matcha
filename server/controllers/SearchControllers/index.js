const express = require('express');
const router = express.Router();

router.post('/getall', require('./getall'));

export default router;