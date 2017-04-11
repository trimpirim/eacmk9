var mongoose = require('mongoose');
var connection = false;

module.exports = function(username, password, host, database, port) {
  var conenctionPart = 'mongodb://' + username + ':' + password + '@' + host;

  if (typeof port !== 'undefined') {
    conenctionPart += ':' + port;
  }

  conenctionPart += '/' + database;

  mongoose.Promise = global.Promise;

  if (!connection) {
    connection = mongoose.connect(conenctionPart);
  }

  return connection;
}