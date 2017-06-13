const express = require('express'),
      router = express.Router(),
      Dog = require('../../models/dog'),
      Litter = require('../../models/litter'),
      form = require('../../forms/dog/form'),
      DogImage = require('../../models/dog-image'),
      Award = require('../../models/award'),
      ImageContent = require('../../models/image-content'),
      ImageConstants = require('../../constants/image-constants'),
      fs = require('fs')

const routes = (loggedMiddleware) => {
  const allDogsAndLitters = (res, callback) => {
    Litter.find({}).sort([['createdAt', 'descending']]).exec((err, litters) => {
      Dog.find({}).sort([['createdAt', 'descending']]).exec((err, dogs) => {
        res.locals.additionals = {
          litters: litters,
          dogs: dogs
        }

        callback()
      })
    })
  }

  router.route('/list')
    .get(loggedMiddleware, (req, res) => {
      form.filter.form(req, res)
      const puppyOptions = [{
        value: form.filter.CONSTANTS.PUPPIES,
        title: req.__('admin.dogs.filter.puppy.only_puppies'),
        selected: req.query.puppy == form.filter.CONSTANTS.PUPPIES
      }, {
        value: form.filter.CONSTANTS.ADULTS,
        title: req.__('admin.dogs.filter.puppy.only_adults'),
        selected: req.query.puppy == form.filter.CONSTANTS.ADULTS
      }]

      Dog.find(form.filter.parseRequest(req.form)).sort([['createdAt', 'descending']]).exec((err, dogs) => {
        if (err) throw err
        Litter.find({}).sort([['createdAt', 'descending']]).exec((err, litters) => {
          if (err) throw err
          res.status(200);
          res.render('admin/dog/list', {dogs: dogs, litters: litters, puppyOptions: puppyOptions, form: req.form});
        })
      });
    });

  router.route('/create')
    .all(loggedMiddleware, (req, res, next) => {
      const dog = new Dog()
      res.locals.dogObject = dog
      allDogsAndLitters(res, next)      
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/dog/create', {dog: res.locals.dogObject, dogs: res.locals.additionals.dogs, litters: res.locals.additionals.litters});
    })
    .post([loggedMiddleware], (req, res, next) => {
      const puppy = !!req.body.puppy
      if (puppy) {
        form.puppy(req, res)
      } else {
        form.dog(req, res)
      }

      res.locals.dogObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/dog/create', {dog: res.locals.dogObject, form: req.form, dogs: res.locals.additionals.dogs, litters: res.locals.additionals.litters})
      }

      res.locals.dogObject.save((err, dog) => {
        if (err) throw err
        res.redirect(200, '/admin/dog/edit/' + dog._id)
      })
    });

  router.route('/edit/:id')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.id}).populate('images awards').exec((err, dog) => {
        if (err) throw err
        res.locals.dogObject = dog
        allDogsAndLitters(res, next)
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200);
      res.render('admin/dog/edit', {dog: res.locals.dogObject, dogs: res.locals.additionals.dogs, litters: res.locals.additionals.litters, form: req.form});
    })
    .post([loggedMiddleware], (req, res, next) => {
      const puppy = !!res.locals.dogObject.puppy
      if (puppy) {
        form.puppy(req, res)
      } else {
        form.dog(req, res)
      }
      res.locals.dogObject.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/dog/edit', {dog: res.locals.dogObject, dogs: res.locals.additionals.dogs, litters: res.locals.additionals.litters, form: req.form})
      }

      res.locals.dogObject.save((err, dog) => {
        if (err) throw err
        res.redirect(200, '/admin/dog/edit/' + dog._id)
      })
    })

  router.route('/delete/:id')
    .get(loggedMiddleware, (req, res) => {
      Dog.findById({_id: req.params.id}, (err, dog) => {
        if (err) throw err;

        dog.remove();

        res.redirect(200, '/admin/dog/list');
      });
    });

  router.route('/images/:dog/add')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.dog}, (err, dog) => {
        if (err) throw err
        res.locals.dog = dog
        res.locals.image = new DogImage()
        next()
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200)
      res.render('admin/dog/images/add', {dog: res.locals.dog, image: res.locals.image})
    })
    .post([loggedMiddleware], (req, res, next) => {
      form.image.create(req, res)
      res.locals.image.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/dog/images/add', {dog: res.locals.dog, image: res.locals.image, form: req.form})
      }

      const file = req.form.content
      const imageContent = new ImageContent({relatedObjectType: ImageContent.RELATED_OBJECT_TYPES.DOG, relatedObject: req.params.dog})
      imageContent.content = file.data
      imageContent.contentType = file.mimetype
      imageContent.save((err, imageContent) => {
        if (err) throw err

        res.locals.image.content = imageContent._id
        res.locals.image.save((err, image) => {
          if (err) throw err

          res.locals.dog.images.push(image)
          res.locals.dog.save((err, dog) => {
            res.redirect(200, '/admin/dog/edit/' + res.locals.dog._id)
          })
        })
      })
    })

  router.route('/images/:dog/edit/:image')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.dog}).populate('images').exec((err, dog) => {
        if (err) throw err
        res.locals.dog = dog
        DogImage.findById({_id: req.params.image}).populate('content').exec((err, image) => {
          if (err) throw err
          res.locals.image = image
          ImageContent.findById({_id: image.content._id}).exec((err, imageContent) => {
            if (err) throw err
            res.locals.imageContent = imageContent
            next()
          })
        })
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200)
      res.render('admin/dog/images/edit', {dog: res.locals.dog, image: res.locals.image, imageContent: res.locals.imageContent})
    })
    .post([loggedMiddleware], (req, res, next) => {
      form.image.edit(req, res)
      res.locals.image.set(req.form)

      if (!req.form.isValid) {
        return res.render('admin/dog/images/edit', {dog: res.locals.dog, image: res.locals.image, form: req.form, imageContent: res.locals.imageContent})
      }

      const file = req.form.content
      if (file) {
        res.locals.imageContent.content = file.data
        res.locals.imageContent.contentType = file.mimetype

        res.locals.imageContent.save()
      }

      res.locals.image.content = res.locals.imageContent
      res.locals.image.save()

      res.status(200)
      res.render('admin/dog/images/edit', {dog: res.locals.dog, image: res.locals.image, imageContent: res.locals.imageContent})
    })

  router.route('/images/:dog/delete/:image')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.dog}).populate('images').exec((err, dog) => {
        if (err) throw err
        res.locals.dog = dog
        DogImage.findById({_id: req.params.image}).populate('content').exec((err, image) => {
          if (err) throw err
          res.locals.image = image
          ImageContent.findById({_id: image.content._id}).exec((err, imageContent) => {
            if (err) throw err
            res.locals.imageContent = imageContent
            next()
          })
        })
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.locals.imageContent.remove()
      res.locals.image.remove()

      const filtered = res.locals.dog.images.filter((image) => {
        return image._id != req.params.image
      })

      res.locals.dog.images = filtered
      res.locals.dog.save()

      res.redirect((filtered.length > 0) ? 200 : 400, '/admin/dog/edit/' + res.locals.dog._id)
    })

  //awards
  router.route('/awards/:dog/add')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.dog}, (err, dog) => {
        if (err) throw err
        res.locals.dog = dog
        Award.find({}).sort([['createdAt', 'descending']]).exec((err, awards) => {
          if (err) throw err
          res.locals.awards = awards
          next()
        })
      })
    })
    .get(loggedMiddleware, (req, res) => {
      res.status(200)
      res.render('admin/dog/awards/add', {dog: res.locals.dog, awards: res.locals.awards, award: null})
    })
    .post([loggedMiddleware], (req, res, next) => {
      form.award(req, res)

      if (!req.form.isValid) {
        return res.render('admin/dog/awards/add', {dog: res.locals.dog, awards: res.locals.awards, form: req.form, award: req.form.award})
      } else {
        Award.findById({_id: req.form.award}).lean().exec((err, award) => {
          if (err) throw err

          if (res.locals.dog.awards.filter(award => {
            return award._id == req.form.award
          }).length == 0) {
            res.locals.dog.awards.push(award)
            res.locals.dog.save()
          }

          res.redirect(200, '/admin/dog/edit/' + res.locals.dog._id)
        })
      }
    })

  router.route('/awards/:dog/delete/:award')
    .all(loggedMiddleware, (req, res, next) => {
      Dog.findById({_id: req.params.dog}).populate('awards').exec((err, dog) => {
        if (err) throw err
        res.locals.dog = dog
        Award.findById({_id: req.params.award}).exec((err, award) => {
          if (err) throw err
          res.locals.award = award
          next()
        })
      })
    })
    .get(loggedMiddleware, (req, res) => {
      const filtered = res.locals.dog.awards.filter((award) => {
        return award._id != req.params.award
      })

      res.locals.dog.awards = filtered
      res.locals.dog.save()

      res.redirect((filtered.length > 0) ? 200 : 400, '/admin/dog/edit/' + res.locals.dog._id)
    })

  return router;
};

module.exports = routes;