const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'inline-source-map',
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
        include: path.resolve(__dirname, "src/client/moonIcons"),
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
        test: /\.js$/,
        exclude: [/(node_modules)/, /test/],
        use: [{
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true,
            produceSourceMap: true
          }
        }],
        enforce: 'post'
      },
      {
        test: /\.js$/,
        exclude: [/(node_modules)/, /test/],
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
