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

const session = require('cookie-session');
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

/* Set Models */
const DB = require('./database/DB');
const Mail = require('./models/Mail');

app.set('db', new DB());
app.set('mail', new Mail());

/* Set multer saveImage */
app.set('save', require('./models/saveImage'));

/* Additional models helpers */
app.set('filterObject', require('./models/filterObject'));
app.set('prepareQuery', require('./models/prepareQuery'));

/*defining routes */
app.use('/api/users/', users);
app.use('/api/image/', image);
app.use('/api/search/', search);
app.use('/api/tags/', tags);
app.use('/api/posts/', posts);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(config.port, () => console.log(`Running on localhost ${config.port}`));
