const express = require('express');
const router = express.Router();

router.post('/add', require('./add'));
router.post('/get', require('./get'));
router.post('/addtouser', require('./addtouser'));
router.post('/deletefromuser', require('./deletefromuser'));

export default router;