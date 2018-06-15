const User = require('../models/User');
const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const user = new User();

router.post('/', (req, res) => {
	console.log('node is ok');
    console.log(req.body);
    res.json({title: 'hello world'});
});

module.exports = router;
//user.createTbl();
/*test*/
//user.create('enigma@gmail.com', 'abc', 'ab', 'ab', 'qwerty', 'female');
//user.create('123@gmail.com', 'aaaaa', 'aaaa', 'aaaa', 'aa', 'female');
//user.update('username', 'tifany', 'id', 1);
//user.delete(2);
//user.getAll();
//user.getByUnique(2);