const User        = require('../models/User');
const express     = require('express');
const phash       = require('password-hash');
const randomToken = require('random-token');
const Mail        = require('../models/Mail');

const router = express.Router();

const user = new User();
const mail = new Mail();
let promise;

router.get('/activate/:token', (req, res) => {
    let token = req.params.token,
        error = (e) => {
            console.log(`activate/${token}`, e);
            res.send('Something went wrong');
        };

    promise = user.getByUnique('token', token);
    promise.then((response) => {
        if (!response || response.activation) {
            res.send('404');
        } else {
            promise = user.update('activation', 1, 'token', token);
            promise.then(() => res.send('Your email has been confirmed')).catch(error);
        }
    }).catch(error);
});

router.post('/resend', (req, res) => {
    let token = randomToken(16),
        usr   = req.body;

    promise = user.getByUnique('email', usr.email);

    promise.then((response) => {

        if (!response || response.activation) {
            res.send('No');
        } else {
            let username = response.username;
            promise = user.update('token', token, 'email', usr.email);
            promise.then(() => {
                mail.resend(usr.email, username, token, (err, info) => {
                    if (err) {
                        console.log(info);
                    } else {
                        console.log(err);
                    }
                });
                res.send('Resend');
            }).catch((e) => {
                console.log(e);
                res.send(e);
            });
        }
    }).catch((e) => {
        console.log(e);
        res.send(e);
    });
});

router.post('/get', (req, res) => {
    let usr = req.body;
    promise = user.getByUnique(
        'email',
        usr.email
    );

    promise.then((response) => {
        if (response === undefined) {
            res.send('no user');
        } else if (!phash.verify(usr.password, response.password)) {
            res.send('wrong password');
        } else if (!response.activation) {
            res.send('no activation');
        } else {
            res.send(response);
        }
    }).catch((e) => {
        res.send(e);
    });
});

router.post('/add', (req, res) => {
    let usr   = req.body,
        token = randomToken(16);
    promise   = user.create(
        usr.email,
        usr.username,
        usr.firstname,
        usr.lastname,
        phash.generate(usr.password),
        token,
        usr.gender);

    promise.then(() => {
        mail.send(usr.email, usr.username, token, (err, info) => {
            if (err) {
                console.log(info);
            } else {
                console.log(err);
            }
        });
        res.send('success');
    }).catch((e) => {
        if (e.errno === 19) {
            res.send('email exists');
        }
    });
});

router.post('/remind', (req, res) => {
    //TODO: get usr email, send link for password recovery. Decide with Julia on how to trigger form for pass recovery
});

export default router;
