var express = require('express');
var admin = express.Router();
var fs = require('fs');
var littersRouter = require('./admin/litters');
var dogsRouter = require('./admin/dogs');
var adminImagesRouter = require('./admin/images');

var routes = function(passport) {
  admin.route('/')
    .get(function(req, res) {
      res.redirect('/admin/login');
    });

  admin.route('/login')
    .get(function(req, res) {
      res.render('admin/login', {message: req.flash('loginMessage')});
    })
    .post(passport.authenticate('local-login', {
      successRedirect: '/admin/litters/list',
      failureRedirect: '/admin/login',
      failureFlash: true
    }));

  admin.use('/litters', littersRouter(logged));
  admin.use('/dog', dogsRouter(logged));
  admin.use('/images', adminImagesRouter(logged));

  function logged(req, res, next) {
    if (req.isAuthenticated()) 
      return next();

    res.redirect('/admin/login');
  }

  return admin;
};

module.exports = routes;