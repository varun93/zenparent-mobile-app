var path = require('path');
var webpack = require('webpack');
var buildPath = path.resolve(__dirname,'www');
var mainPath = path.resolve(__dirname, 'index');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
         mainPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        root: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            }, 
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            }
        ]
    },
    plugins : [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })

    ]
};