var express = require('express');
var dogsRouter = express.Router();
var Dog = require('../../models/dog');
var formOfDogEdit = require('../../forms/dog/edit');
var formOfDogCreate = require('../../forms/dog/create');
var fs = require('fs');

var routes = function(loggedMiddleware) {
  dogsRouter.route('/list')
    .get(loggedMiddleware, function(req, res) {
      Dog.find({}).sort([['createdAt', 'descending']]).exec(function(err, dogs) {
        if (err) throw err;
        res.status(200);
        res.render('admin/dog/list', {dogs: dogs});
      });
    });

  dogsRouter.route('/edit/:id')
    .get(loggedMiddleware, function(req, res) {
      Dog.findById({_id: req.params.id}).populate('images').exec(function(err, dog) {
        if (err) throw err;
        res.status(200);
        res.render('admin/dog/edit', {dog: dog});
      });
    })
    .post([loggedMiddleware], function(req, res, next) {
      Dog.findById({_id: req.params.id}, function(err, dog) {
        if (err) throw err;

        formOfDogEdit(req, res);
        dog.set(req.form);

        if (!req.form.isValid) {
          return res.render('admin/dog/edit', {dog: dog, form: req.form});
        }

        dog.save();

        res.status(200);
        res.render('admin/dog/edit', {dog: dog, form: req.form});
      });
    });

  dogsRouter.route('/create')
    .get(loggedMiddleware, function(req, res) {
      var dog = new Dog();

      res.status(200);
      res.render('admin/dog/create', {dog: dog});
    })
    .post([loggedMiddleware], function(req, res, next) {
      formOfDogCreate(req, res);

      var dog = new Dog();
      dog.set(req.form);

      if (!req.form.isValid) {
        return res.render('admin/dog/create', {dog: dog, form: req.form});
      }

      dog.save();

      res.redirect(200, '/admin/dog/edit/' + dog._id);
    });
  dogsRouter.route('/delete/:id')
    .get(loggedMiddleware, function(req, res) {
      Dog.findById({_id: req.params.id}, function(err, dog) {
        if (err) throw err;

        dog.remove();

        res.redirect(200, '/admin/dog/list');
      });
    });

  return dogsRouter;
};

module.exports = routes;