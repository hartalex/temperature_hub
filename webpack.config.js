const webpack = require('webpack')
const path = require('path')
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css')
    /* new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin() */
      // new CommonsChunkPlugin('commons.js',['index','contact','about','careers','hire','products','privacy','termsofuse','enduserlicenseagreement'])
  ],
  entry: {
    index: './web/index.js',
    menu: './web/menu.js'
  //  css: [
          //  './src/client/css/main.css',
  //  ]
    //  favicon: './src/client/images/favicon.ico'
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
        query: {
          presets: ['latest', 'react']
        }
      }
    ]
  }
}
