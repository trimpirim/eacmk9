var path = require('path');

module.exports = {
  BUILD_DIR: path.resolve(__dirname, 'public/js'),
  APP_DIR: path.resolve(__dirname, 'src/frontend'),
  ENTRY_FILE: 'index.js',
  OUTPUT_FILE: 'bundle.js'
};