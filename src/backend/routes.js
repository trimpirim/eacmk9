const path = require('path')
    express = require('express'),
    api = require('./routes/api'),
    mocks = require('./routes/mocks'),
    admin = require('./routes/admin'),
    images = require('./routes/images')

module.exports = {
  mocks: mocks,
  api: api,
  admin: admin,
  images: images,
  any: (req, res) => {
    res.sendFile(path.resolve(req.pathOfRoot, 'index.html'))
  }
}