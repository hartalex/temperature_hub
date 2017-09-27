const webpack = require('webpack')
const path = require('path')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new UglifyJSPlugin(),
    new CommonsChunkPlugin({
      name: 'commons',
      // (the commons chunk name)
      chunks: ['index', 'menu'],
      filename: 'commons.js'
      // (the filename of the commons chunk)
    })
  ],

  entry: {
    'index': './src/client/index.js',
    'menu': './src/client/menu.js',
  },
  output: {
    path: path.join(__dirname, '/build/client'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader|resolve-url-loader' })
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
      },
      {
        test: /.*favicon\.(ico)$/i,
        loaders: ['file-loader?name=favicon.ico']
      },
      {
        test: /.*\.(ttf|eot|woff|woff2|zip)$/i,
        loaders: ['file-loader?hash=sha512&digest=hex&name=[hash].[ext]']
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }
    ]
  }
}
