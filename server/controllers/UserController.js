const User    = require('../models/User');
const express = require('express');
const phash   = require('password-hash');

const router = express.Router();

const user = new User();

router.post('/get', (req, res) => {
    let usr     = req.body;
    let promise = user.getByUnique(
        'email',
        usr.email
    );

    promise.then((response) => {
        if (response === undefined) {
            res.send('no user');
        } else if (!phash.verify(usr.password, response.password)) {
            res.send('wrong password');
        } else {
            res.send(response);
        }
    }).catch((e) => {
        res.send(e);
    });
});

router.post('/add', (req, res) => {
    console.log('node is ok');
    let usr     = req.body;
    let promise = user.create(
        usr.email,
        usr.username,
        usr.firstname,
        usr.lastname,
        phash.generate(usr.password),
        usr.gender);
    promise.then(() => {
        res.send('success');
    }).catch((e) => {
        if (e.errno === 19) {
            res.send('email exists');
        }
    });
});

export default router;
