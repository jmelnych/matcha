const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));

export default router;