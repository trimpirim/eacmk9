var express = require('express');
var router = express.Router();
var formOfLitterCreate = require('../../forms/litter/create');
var formOfLitterEdit = require('../../forms/litter/edit');
var fs = require('fs');
var ImageConstants = require('../../constants/image-constants');
var Litter = require('../../models/litter');

var routes = function(loggedMiddleware) {
  router.route('/list')
    .get(loggedMiddleware, function(req, res) {
      Litter.find({}).sort([['createdAt', 'descending']]).exec(function(err, litters) {
        if (err) throw err;
        res.status(200);
        res.render('admin/litters/list', {litters: litters});
      });
    });

  router.route('/create')
    .get(loggedMiddleware, function(req, res) {
      var litter = new Litter();

      res.status(200);
      res.render('admin/litters/create', {litter: litter});
    })
    .post(loggedMiddleware, function(req, res) {
      formOfLitterCreate(req, res);
      var litter = new Litter();
      litter.set(req.form);

      if (!req.form.isValid) {
        return res.render('admin/litters/create', {litter: litter, form: req.form});
      }

      litter.save(function(err, litter) {
        if (err) throw err;

        res.redirect(200, '/admin/litters/edit/' + litter._id);
      });
    });

  router.route('/edit/:litter')
    .get(loggedMiddleware, function(req, res) {
      Litter.findById({_id: req.params.litter}).exec(function(err, litter) {
        if (err) throw err;

        res.status(200);
        res.render('admin/litters/edit', {litter: litter});
      })
    })
    .post(loggedMiddleware, function(req, res) {
      Litter.findById({_id: req.params.litter}).exec(function(err, litter) {
        if (err) throw err;

        formOfLitterEdit(req, res);
        litter.set(req.form);

        if (!req.form.isValid) {
          return res.render('admin/litters/edit', {litter: litter, form: req.form});
        }

        litter.save(function(err, litter) {
          if (err) throw err;

          res.render('admin/litters/edit', {litter: litter, form: req.form});
        })
      })
    });

  router.route('/delete/:litter')
    .get(loggedMiddleware, function(req, res) {
      Litter.findById({_id: req.params.litter}).exec(function(err, litter) {
        if (err) throw err;

        litter.remove();
      })
    });

  return router;
};

module.exports = routes;