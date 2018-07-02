import path from 'path'
import webpack from 'webpack'

export default {
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/src/index.js'),
    ],


    output: {
        path: '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client/src/')
                ],
                loaders: ['babel-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader',
                ],
                // options: {
                //     name: '[path][name]-[hash:8].[ext]'
                // }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}