const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  entry: {
    'test': './src/test/test.js'
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',

          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '/img/[hash].[ext]'
          }
        }]
      },
      {
        test: /.*favicon\.(ico)$/i,
        use: [{
          loader: 'file-loader',

          options: {
            name: 'favicon.ico'
          }
        }]
      },
      {
        test: /.*\.(ttf|eot|woff|woff2|zip)$/i,
        use: [{
          loader: 'file-loader',

          options: {
            hash: 'sha512',
            digest: 'hex',
            name: '[hash].[ext]'
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            "presets": [ "react",
              ["env", {
                "targets": {
                  "node": "current"
                },
                "plugins": ["istanbul"]
              }]
            ]
          }
        }]
      }
    ]
  }
}
