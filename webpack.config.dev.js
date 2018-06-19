import path from 'path'

export default {
    entry: path.join(__dirname, '/client/src/index.js'),
    output: {
     path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client/src')
                ],
                loaders: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}