const nodemailer = require('nodemailer');
const config     = require('../config');

module.exports = class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            sendmail: true,
            newline: 'unix',
            path: '/usr/sbin/sendmail'
        });
    }

    send(email, username, token,  callback_func) {
        this.transporter.sendMail({
            from: 'no-reply@matcha.ua',
            to: email,
            subject: 'Activation',
            html: `
<h3>Hi</h3> <strong>${username}</strong>, and welcome.<br>
Here is an activation <a href="${config.host}:${config.port}/api/users/activate/${token}">Link</a><br>
Love, Matcha.
`
        }, callback_func);

    }

    resend(email, username, token,  callback_func) {
        this.transporter.sendMail({
            from: 'no-reply@matcha.ua',
            to: email,
            subject: 'New activation',
            html: `

<h3>Hi</h3> <strong>${username}</strong> it seems you lost your activation link<br>
well, that's sad :(<br>
Here is your new activation <a href="${config.host}:${config.port}/api/users/activate/${token}">Link</a><br>
Don't lose it again.<br>
Love, Matcha.
`
        }, callback_func);

    }
};