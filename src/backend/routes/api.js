var express = require('express');
var Litter = require('../models/litter');

var api = express.Router();
api.route('/litters')
  .get(function(req, res) {
    Litter.find({}).lean().exec(function(err, litters) {
      if (err) throw err;
      res.status(200);

      return res.json(litters.map(function(object, key) {
        object['key'] = object._id;
        return object;
      }));
    });
  });

module.exports = api;