const User       = require('../models/User');
const express    = require('express');
const bodyParser = require('body-parser');
const phash      = require('password-hash');

const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const user = new User();
//user.createTbl();
router.post('/add', (req, res) => {
    console.log('node is ok');

    let usr = req.body.data;
    user.create(
        usr.email,
        usr.username,
        usr.firstname,
        usr.lastname,
        phash.generate(usr.password),
        usr.gender,
        err => res.json(err)
    );
});

module.exports = router;
/*test*/
//user.create('enigma@gmail.com', 'abc', 'ab', 'ab', 'qwerty', 'female');
//user.create('123@gmail.com', 'aaaaa', 'aaaa', 'aaaa', 'aa', 'female');
//user.update('username', 'tifany', 'id', 1);
//user.delete(2);
//user.getAll();
//user.getByUnique(2);