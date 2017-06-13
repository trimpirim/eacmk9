const express = require('express'),
      admin = express.Router(),
      fs = require('fs'),
      littersRouter = require('./admin/litters'),
      dogsRouter = require('./admin/dogs'),
      awardsRouter = require('./admin/awards'),
      dynamicContentRouter = require('./admin/dynamic-content'),
      adminImagesRouter = require('./admin/images')

const routes = function(passport) {
  admin.route('/')
    .get((req, res) => {
      res.redirect('/admin/login')
    })

  admin.route('/login')
    .get((req, res) => {
      res.render('admin/login', {message: req.flash('loginMessage')})
    })
    .post(passport.authenticate('local-login', {
      successRedirect: '/admin/litters/list',
      failureRedirect: '/admin/login',
      failureFlash: true
    }))

  admin.use('/litters', littersRouter(logged))
  admin.use('/dog', dogsRouter(logged))
  admin.use('/award', awardsRouter(logged))
  admin.use('/images', adminImagesRouter(logged))
  admin.use('/dynamic-content', dynamicContentRouter(logged))

  function logged(req, res, next) {
    if (req.isAuthenticated()) 
      return next()

    res.redirect('/admin/login')
  }

  return admin
}

module.exports = routes