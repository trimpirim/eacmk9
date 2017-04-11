var path = require('path');

module.exports = {
  BUILD_DIR: path.resolve(__dirname, 'public/js/admin'),
  APP_DIR: path.resolve(__dirname, 'src/backend/public/js'),
  ENTRY_FILE: 'app.js',
  OUTPUT_FILE: 'bundle.js'
};