var path = require('path');

module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
        {
            test: /\.js|jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        },
        {
            test: /\.css|less$/, 
            loader: 'style!css'
        }]
    },
    devSever: {
        historyApiFallback: true
    }

}