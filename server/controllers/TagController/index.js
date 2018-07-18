const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

router.post('/get-for-user', require('./getForUser'));

router.post('/add-to-user', require('./userAddDelete'));

router.post('/delete-from-user', require('./userAddDelete'));

export default router;
