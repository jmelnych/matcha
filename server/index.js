import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import users from './controllers/UserController';
const bodyParser = require('body-parser');
const config = require('./config');

let app = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/*defining routes */
app.use('/api/users/', users);

app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(config.port, () => console.log(`Running on localhost ${config.port}`));