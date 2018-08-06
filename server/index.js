import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import users from './controllers/UserController';
import search from './controllers/SearchController';
import tags from './controllers/TagController';
import image from './controllers/ImageController';
import posts from './controllers/PostController';
import profile from './controllers/ProfileController';

const session    = require('cookie-session');
const bodyParser = require('body-parser');
const config     = require('./config');
const socket     = require('socket.io');

let app        = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* set session cookie */
app.use(session({
    name: 'session',
    keys: ['key1']
}));

/* Set root dir */
app.set('rootDir', path.dirname(__dirname));


/* Set Models */
const DB   = require('./database/DB');
const Mail = require('./models/Mail');

app.set('db', new DB());
app.set('mail', new Mail());

/* Set multer saveImage */
app.set('save', require('./models/saveImage'));

/* Additional models helpers */
app.set('location', require('./models/location'));
app.set('prepareHistory', require('./models/prepareHistory'));
app.set('relationshipHistory', require('./models/relationshipHistory'));
app.set('filterObject', require('./models/filterObject'));
app.set('prepareQuery', require('./models/prepareQuery'));
app.set('prepareUsers', require('./models/prepareUsers'));

/* Defining routes */
app.use('/api/users/', users);
app.use('/api/image/', image);
app.use('/api/search/', search);
app.use('/api/tags/', tags);
app.use('/api/posts/', posts);
app.use('/api/profile/', profile);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const server = app.listen(config.port, () => console.log(`Running on localhost ${config.port}`));

/* socket setup */
const io = socket(server);
let connectedUsers = [];
io.on('connection', (socket) => {
    console.log('user made socket connection', socket.id);
    socket.on('users', id => {
        if (connectedUsers.filter(user => user.id === id).length) {
            return;
        } else {
            connectedUsers.push({id, socket: socket.id});
        }
    });

    //TODO: save that user online. grab current user id via cookies?
    socket.on('chat', (data) => {
        console.log('data that comes from client', data);
        let socketId = connectedUsers.map(user => user.id === data.recipientId);
        io.sockets.emit('chat', data);
        //TODO: send msg to given socketId
        //socket.broadcast.to(socketId).emit('chat', data);
    });
    socket.on('disconnect', () => {
        console.log('user left', socket.id);
        connectedUsers.map(user => {
            if(user.socket === socket.id){
                delete connectedUsers.user;
            }
        })
        //TODO: save that user's gone offline
    })
});
