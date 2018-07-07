import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import users from './controllers/UserController';
import search from './controllers/SearchController'
import image from './controllers/ImageController'

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
const User = require('./models/User');
const Tag = require('./models/Tag');
const Mail = require('./models/Mail');

app.set('user', new User());
app.set('tag', new Tag());
app.set('mail', new Mail());

/* Set multer saveImage */
app.set('save', require('./saveImage'));

/*defining routes */
app.use('/api/users/', users);
app.use('/api/image/', image);
app.use('/api/search/', search);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(config.port, () => console.log(`Running on localhost ${config.port}`));