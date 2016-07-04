var path = require('path');
var webpack = require('webpack');

var build_path = path.resolve(__dirname, 'build');
var js_path = path.resolve(__dirname, 'assets/javascripts');

module.exports = {
    entry: [
        path.resolve(js_path, 'app.jsx')
    ],
    output: {
        path: build_path,
        filename: 'app-bundle-generated.js'
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: [js_path],
            exclude: /(node_modules)/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ["transform-class-properties"]
            }
        }]
    },
    /* devtool: 'source-map', */
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    }
}
