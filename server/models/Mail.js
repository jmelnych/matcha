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
<h2>Hi</h2> <strong>${username}</strong>, and welcome.
Here is an activation link ${config.host}:${config.port}/api/users/activate/${token}
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
<h2>Hi</h2> <strong>${username}</strong> it seems you lost your activation link
well, that's sad :(
Here is your new activation link ${config.host}:${config.port}/api/users/activate/${token}
Don't lose it too.
Love, Matcha.
`
        }, callback_func);

    }
};