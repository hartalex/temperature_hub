const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new ExtractTextPlugin("style.css"),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new CommonsChunkPlugin("commons.js",["index","contact","about","careers","hire","products","privacy","termsofuse","enduserlicenseagreement"])
    ],
    entry: {
      index: "./src/client/index.js",
      contact: "./src/client/contact.js",
      about: "./src/client/about.js",
      careers: "./src/client/careers.js",
      hire: "./src/client/hire.js",
      products: "./src/client/products.js",
      privacy: "./src/client/privacy.js",
      termsofuse: "./src/client/terms-of-use.js",
      enduserlicenseagreement: "./src/client/end-user-license-agreement.js",
      css: [
            "./node_modules/bootstrap/dist/css/bootstrap.min.css",
            "./src/client/css/main.css",
            "./src/client/css/navbar.css"
          ],
      favicon: "./src/client/images/favicon.ico"
    },
    output: {
        path: __dirname + '/build/client',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
              test: /\.css$/,
              loader: ExtractTextPlugin.extract("style-loader","css-loader!resolve-url-loader")
            },
            {
              test: /.*\.(gif|png|jpe?g|svg)$/i,
              loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]']
            },
            {
              test: /.*favicon\.(ico)$/i,
              loaders: ['file?name=favicon.ico']
            },
            {
              test: /.*\.(ttf|eot|woff|woff2|zip)$/i,
              loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]']
            },
            {
              test: /\.js$/,
              exclude: /(node_modules)/,
              loader: 'babel', // 'babel-loader' is also a valid name to reference
              query: {
              presets: ['latest']
            }
        }
        ]
    }
};
