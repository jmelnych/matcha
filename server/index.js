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
import messages from './controllers/MessagesController';

const session    = require('cookie-session');
const bodyParser = require('body-parser');
const config     = require('./config');


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
const DB     = require('./database/DB');
const Mail   = require('./models/Mail');
const Socket = require('./models/socket');

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
app.use('/api/messages/', messages);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const server = app.listen(config.port, () => console.log(`Running on localhost ${config.port}`));
app.set('socket', new Socket(server));
