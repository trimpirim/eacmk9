var express = require('express');
var Litter = require('../models/litter');
var Dog = require('../models/dog');

var api = express.Router();
api.route('/litters')
  .get(function(req, res) {
    Litter.find({}).lean().exec(function(err, litters) {
      if (err) throw err;
      res.status(200);

      return res.json(litters);
    });
  });
api.route('/litters/:litter')
  .get(function(req, res) {
    Litter.find({_id: req.params.litter}).lean().exec(function(err, litter) {
      if (err) throw err;

      res.status(200);
      return res.json(litter);
    })
  })

api.route('/dogs')
  .get(function(req, res) {
    Dog.find({}).lean().exec(function(err, dogs) {
      if (err) throw err;
      res.status(200);
      return res.json(dogs);
    });
  })
api.route('/dogs/:dog')
  .get(function(req, res) {
    Dog.findById({_id: req.params.dog}).populate('images images.content').exec(function(err, dog) {
      if (err) throw err;

      res.status(200);
      return res.json(dog);
    })
  })

module.exports = api;