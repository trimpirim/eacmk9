const express = require('express'),
      router = express.Router(),
      form = require('../../forms/dynamic-content/form'),
      DynamicContent = require('../../models/dynamic-content')

const routes = (loggedMiddleware) => {

  router.route('/list')
    .get(loggedMiddleware, (req, res) => {
      DynamicContent.find({}).sort([['createdAt', 'descending']]).exec((err, dynamicContents) => {
        if (err) throw err;

        const existingContents = {
          about: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.ABOUT
          }).length > 0,
          services: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.SERVICES
          }).length > 0,
          breeding: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.BREEDING
          }).length > 0,
          training: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.TRAINING
          }).length > 0,
          detection: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.DETECTION
          }).length > 0,
          security: dynamicContents.filter((item) => {
            return item.identifier == DynamicContent.TYPES.SECURITY
          }).length > 0
        }

        res.status(200);
        res.render('admin/dynamic-content/list', {dynamicContents: dynamicContents, existingContents: existingContents});
      });
    });

  router.route('/create')
    .all(loggedMiddleware, (req, res, next) => {
      const dynamicContent = new DynamicContent()
      res.locals.dynamicContentObject = dynamicContent
      form.dynamicContent(req, res)
      const which = req.query.which
      if (Object.values(DynamicContent.TYPES).filter((item) => {
        return item == which
      }).length > 0) {
        next() 
      } else {
        res.redirect(200, '/admin/dynamic-content/list');
      }
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/dynamic-content/create', {dynamicContent: res.locals.dynamicContentObject, which: req.query.which});
    })
    .post([loggedMiddleware], (req, res, next) => {
      res.locals.dynamicContentObject.set(req.form)
      res.locals.dynamicContentObject.identifier = req.query.which

      if (!req.form.isValid) {
        return res.render('admin/dynamic-content/create', {dynamicContent: res.locals.dynamicContentObject, form: req.form, which: req.query.which})
      }

      res.locals.dynamicContentObject.save((err, dynamicContent) => {
        if (err) throw err
        res.redirect(200, '/admin/dynamic-content/edit/' + dynamicContent._id)
      })
    });

  router.route('/edit/:id')
    .all(loggedMiddleware, (req, res, next) => {
      DynamicContent.findById({_id: req.params.id}).exec((err, dynamicContent) => {
        if (err) throw err
        res.locals.dynamicContentObject = dynamicContent
        form.dynamicContent(req, res)
        next()
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/dynamic-content/edit', {dynamicContent: res.locals.dynamicContentObject});
    })
    .post([loggedMiddleware], (req, res, next) => {
      res.locals.dynamicContentObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/dynamic-content/edit', {dynamicContent: res.locals.dynamicContentObject, form: req.form})
      }

      res.locals.dynamicContentObject.save((err, dynamicContent) => {
        if (err) throw err
        res.redirect(200, '/admin/dynamic-content/edit/' + dynamicContent._id)
      })
    })

  router.route('/delete/:id')
    .get(loggedMiddleware, (req, res) => {
      DynamicContent.findById({_id: req.params.id}, (err, dynamicContent) => {
        if (err) throw err;

        dynamicContent.remove();

        res.redirect(200, '/admin/dynamic-content/list');
      });
    });

  return router;
};

module.exports = routes;