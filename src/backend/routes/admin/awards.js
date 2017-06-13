const express = require('express'),
      router = express.Router(),
      form = require('../../forms/award/form'),
      Award = require('../../models/award')

const routes = (loggedMiddleware) => {

  router.route('/list')
    .get(loggedMiddleware, (req, res) => {
      form.award(req, res)

      Award.find().sort([['createdAt', 'descending']]).exec((err, awards) => {
        if (err) throw err

        res.status(200)
        res.render('admin/award/list', {awards: awards, form: req.form})
      });
    });

  router.route('/create')
    .all(loggedMiddleware, (req, res, next) => {
      const award = new Award()
      res.locals.awardObject = award
      next()
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/award/create', {award: res.locals.awardObject});
    })
    .post([loggedMiddleware], (req, res, next) => {
      form.award(req, res)

      res.locals.awardObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/award/create', {award: res.locals.awardObject, form: req.form})
      }

      res.locals.awardObject.save((err, award) => {
        if (err) throw err
        res.redirect(200, '/admin/award/edit/' + award._id)
      })
    });

  router.route('/edit/:id')
    .all(loggedMiddleware, (req, res, next) => {
      Award.findById({_id: req.params.id}).populate('images awards').exec((err, award) => {
        if (err) throw err
        res.locals.awardObject = award
        next()
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/award/edit', {award: res.locals.awardObject, form: req.form});
    })
    .post([loggedMiddleware], (req, res, next) => {
      form.award(req, res)

      res.locals.awardObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/award/edit', {award: res.locals.awardObject, form: req.form})
      }

      res.locals.awardObject.save((err, award) => {
        if (err) throw err
        res.redirect(200, '/admin/award/edit/' + award._id)
      })
    })

  router.route('/delete/:id')
    .get(loggedMiddleware, (req, res) => {
      Award.findById({_id: req.params.id}, (err, award) => {
        if (err) throw err;

        award.remove();

        res.redirect(200, '/admin/award/list');
      });
    });

  return router;
};

module.exports = routes;