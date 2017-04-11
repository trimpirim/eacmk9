var webpack = require('webpack')
var configuration = require('./config.frontend.js');

module.exports = {
  entry: configuration.APP_DIR + '/' + configuration.ENTRY_FILE,
  output: {
    path: configuration.BUILD_DIR,
    filename: configuration.OUTPUT_FILE
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel'
    }
  }
}
