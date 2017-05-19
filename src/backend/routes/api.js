const express = require('express'),
      Litter = require('../models/litter'),
      Dog = require('../models/dog'),
      DynamicContent = require('../models/dynamic-content'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      form = require('express-form')
        .configure({dataSources: ['body', 'files', 'query', 'params']}),
      field = form.field,
      Filter = require('../helpers/request-filter')

const api = express.Router()
api.route('/litters')
  .get((req, res) => {
    Litter.find({}).lean().exec((err, litters) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.litters.database'})
      } else {
        Dog.find({puppy: {$eq: 1}}).populate('litter sire dam images images.content awards').exec((err, dogs) => {
          if (err) {
            res.status(500)
            res.json({error: true, message: 'error.dogs.database'})
          } else {
            const mapped = litters.map((litter) => {
              const filtered = dogs.filter((dog) => {
                return typeof dog.litter !== 'undefined' && dog.litter._id.toString() == litter._id.toString()
              })

              litter['puppies'] = filtered
              return litter
            })

            res.status(200)
            res.json(mapped)
          }
        })
      }
    })
  })
api.route('/litters/:litter')
  .get((req, res) => {
    Litter.findById({_id: req.params.litter}).lean().exec((err, litter) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.litters.database'})
      } else {
        res.status(200)
        res.json(litter)
      }
    })
  })

api.route('/dogs')
  .get((req, res) => {
    filterForm = form(
      field('name').trim().ifNull(false),
      field('puppy').ifNull('all'),
      field('discipline').ifNull('all'),
      field('title').ifNull(false),
      field('certification').ifNull(false),
      field('gender').ifNull('all'),
      field('color').ifNull('all'),
      field('age').ifNull('all'),
      field('litter').ifNull(false),
      field('sire').ifNull(false),
      field('dam').ifNull(false)
    )(req, res)

    const handledForm = req.form
    const filter = Filter.parseFilter({
      puppy: {
        criteria: {$eq: !!+handledForm.puppy},
        shouldFilter: handledForm.puppy !== 'all' && handledForm.puppy !== ''
      },
      sire: {
        criteria: handledForm.sire
      },
      dam: {
        criteria: handledForm.dam
      },
      litter: {
        criteria: handledForm.litter
      },
      discipline: {
        criteria: {$eq: handledForm.discipline},
        shouldFilter: handledForm.discipline !== 'all' && handledForm.discipline !== ''
      },
      title: {
        criteria: handledForm.title,
      },
      certification: {
        criteria: handledForm.certification,
      },
      gender: {
        criteria: {$eq: handledForm.gender},
        shouldFilter: handledForm.gender !== 'all' && handledForm.gender !== ''
      },
      color: {
        criteria: {$regex: handledForm.color, $options: 'i'},
        shouldFilter: handledForm.color !== 'all' && handledForm.color !== ''
      },
      age: {
        criteria: {$eq: handledForm.age},
        shouldFilter: handledForm.age !== 'all' && handledForm.age !== ''
      },
    }, handledForm)

    Dog.find(filter).populate('sire dam images images.content awards').exec((err, dogs) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.dogs.database'})
      } else {
        if (typeof req.query['only-one'] !== 'undefined') {
          if (dogs.length > 0) {
            dogs = dogs[0]
          }
        }

        res.status(200)
        res.json(dogs)
      }
    })
  })

api.route('/dogs/by-litter/:litter')
  .get((req, res) => {
    Litter.findById({_id: req.params.litter}).exec((err, litter) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.litters.database'})
      } else {
        Dog.find({'litter': litter._id}).exec((err, dogs) => {
          if (err) {
            res.json({error: true, message: 'error.dogs.database'})
          } else {
            if (dogs.length > 0) {
              res.json({dogs: dogs})
            } else {
              res.json({dogs: []})
            }
          }
        })
      }
    })
  })

api.route('/dogs/:dog')
  .get((req, res) => {
    Dog.findById({_id: req.params.dog}).populate('sire dam images images.content awards').lean().exec((err, dog) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.dog.database'})
      } else {
        res.status(200)
        res.json(dog)
      }
    })
  })

api.route('/dynamic-content/list')
  .get((req, res) => {
    DynamicContent.find({}).lean().exec((err, dynamicContents) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.dynamic_content.database'})
      } else {
        res.status(200)
        const mapped = {}
        dynamicContents.forEach(item => {
          mapped[item.title] = item
        })
        res.json(mapped)
      }
    })
  })

api.route('/dynamic-content/:identifier')
  .get((req, res) => {
    const which = req.params.identifier
    if (Object.values(DynamicContent.TYPES).filter((item) => {
      return item == which
    }).length > 0) {
      DynamicContent.findOne({'identifier': req.params.identifier}).exec((err, dynamicContent) => {
        if (err) {
          res.status(500)
          res.json({error: true, message: 'error.dynamic_content.database'})
        } else {
          res.status(200)
          res.json(dynamicContent || {error: true, message: 'error.dynamic_content.does_not_exist'})
        }
      })
    } else {
      res.status(500);
      res.json({error: true, message: 'error.dynamic_content.no_such_object'})
    }
  })

module.exports = api