const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));

router.post('/get', require('./get'));

router.post('/get-for-user', require('./getForUser'));

router.post('/add-to-user', require('./addToUser'));

router.post('/delete-from-user', require('./deleteFromUser'));

export default router;
