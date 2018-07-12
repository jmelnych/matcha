const express = require('express');
const router = express.Router();

router.post('/getall', require('./getall'));

router.post('/getbyfilter', require('./getbyfilter'));

export default router;
