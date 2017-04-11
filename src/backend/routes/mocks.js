var express = require('express'),
    User = require('../models/user');

var mocks = express.Router();

mocks.route('/add-admin')
  .get(function(req, res) {
    var user = new User();
    user.username = 'admin';
    user.password = user.generateHash('admin');
    user.save(function(err, result) {
      if (err) throw err;

      res.status(200);
      res.send('SUCCESS');
    })
  });

module.exports = mocks;