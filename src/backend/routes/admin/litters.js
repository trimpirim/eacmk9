const express = require('express'),
      router = express.Router(),
      form = require('../../forms/litter/form'),
      fs = require('fs'),
      ImageConstants = require('../../constants/image-constants'),
      Litter = require('../../models/litter')

const routes = (loggedMiddleware) => {
  router.route('/list')
    .get(loggedMiddleware, (req, res) => {
      Litter.find({}).sort([['createdAt', 'descending']]).exec((err, litters) => {
        if (err) throw err
        res.status(200)
        res.render('admin/litters/list', {litters: litters})
      })
    })

  router.route('/create')
    .all(loggedMiddleware, (req, res, next) => {
      const litter = new Litter()
      res.locals.litterObject = litter
      next()
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200)
      res.render('admin/litters/create', {litter: res.locals.litterObject, form: req.form})
    })
    .post(loggedMiddleware, (req, res) => {
      form.create(req, res)
      res.locals.litterObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/litters/create', {litter: res.locals.litterObject, form: req.form})
      }

      res.locals.litterObject.save((err, litter) => {
        if (err) throw err
        res.redirect(200, '/admin/litters/edit/' + litter._id)
      })
    })

  router.route('/edit/:id')
    .all(loggedMiddleware, (req, res, next) => {
      Litter.findById({_id: req.params.id}).exec((err, litter) => {
        if (err) throw err
        res.locals.litterObject = litter
        next()
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200)
      res.render('admin/litters/edit', {litter: res.locals.litterObject})
    })
    .post(loggedMiddleware, (req, res) => {
      form.edit(req, res)
      res.locals.litterObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/litters/edit', {litter: res.locals.litterObject, form: req.form})
      }

      res.locals.litterObject.save((err, litter) => {
        if (err) throw err
        res.render('admin/litters/edit', {litter: res.locals.litterObject, form: req.form})
      })
    })

  router.route('/delete/:id')
    .get(loggedMiddleware, (req, res) => {
      Litter.findById({_id: req.params.id}).exec((err, litter) => {
        litter.remove((err) => {
          if (err) throw err
          res.redirect(200, '/admin/litters/list')
        })
      })
    })

  return router
}

module.exports = routes