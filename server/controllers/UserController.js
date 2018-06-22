const User    = require('../models/User');
const express = require('express');
const phash   = require('password-hash');

const router = express.Router();

const user = new User();

router.post('/get', (req, res) => {
    console.log('get', req.body);
    let usr     = req.body;
    let promise = user.getByUnique(
        'email',
        usr.email
    );

    promise.then((resp) => {
        res.send(resp);
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
