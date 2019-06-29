const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  entry: {
    index: './src/client/index.js',
    menuEntry: './src/client/menuEntry.js',
    memoryEntry: './src/client/memoryEntry.js',
  },
  output: {
    path: path.join(__dirname, '/build/client'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader|resolve-url-loader',
        }),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',

            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '/img/[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /.*favicon\.(ico)$/i,
        use: [
          {
            loader: 'file-loader',

            options: {
              name: 'favicon.ico',
            },
          },
        ],
      },
      {
        test: /.*\.(ttf|eot|woff|woff2|zip)$/i,
        use: [
          {
            loader: 'file-loader',

            options: {
              hash: 'sha512',
              digest: 'hex',
              name: '[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,

        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};
