const mongoose = require('mongoose')
let connection = false

module.exports = function(username, password, host, database, port) {
  let conenctionPart = 'mongodb://' + username + ':' + password + '@' + host

  if (typeof port !== 'undefined') {
    conenctionPart += ':' + port
  }

  conenctionPart += '/' + database

  mongoose.Promise = global.Promise

  if (!connection) {
    connection = mongoose.connect(conenctionPart)
  }

  return connection
}