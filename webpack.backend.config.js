var webpack = require('webpack');
var configuration = require('./config.backend.js');

var config = {
  entry: configuration.APP_DIR + '/' + configuration.ENTRY_FILE,
  output: {
    path: configuration.BUILD_DIR,
    filename: configuration.OUTPUT_FILE
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        include : configuration.APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;
