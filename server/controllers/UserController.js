const User       = require('../models/User');
const express    = require('express');
const phash      = require('password-hash');

const router = express.Router();

const user = new User();

router.post('/', (req, res) => {
    console.log('node is ok');
    let usr = req.body;
    let promise = user.create(
        usr.email,
        usr.username,
        usr.firstname,
        usr.lastname,
        phash.generate(usr.password),
        usr.gender);
    promise.then(response => {
        res.send('success');
        })
        .catch((e) => {
        if (e.errno === 19) {
            res.send('email exists');
        }
    });
});

export default router;
/*test*/
//user.create('enigma@gmail.com', 'abc', 'ab', 'ab', 'qwerty', 'female');
//user.create('123@gmail.com', 'aaaaa', 'aaaa', 'aaaa', 'aa', 'female');
//user.update('username', 'tifany', 'id', 1);
//user.delete(2);
//user.getAll();
//user.getByUnique(id, 2);