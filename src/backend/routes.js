var path = require('path')
    express = require('express'),
    api = require('./routes/api'),
    mocks = require('./routes/mocks'),
    admin = require('./routes/admin'),

module.exports = {
  mocks: mocks,
  api: api,
  admin: admin,
  // images: images,
  any: function(req, res) {
    res.sendFile(path.resolve(req.pathOfRoot, 'index.html'));
  }
}