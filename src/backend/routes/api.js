const express = require('express'),
      Litter = require('../models/litter'),
      Dog = require('../models/dog'),
      Award = require('../models/award'),
      DynamicContent = require('../models/dynamic-content'),
      mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      form = require('express-form')
        .configure({dataSources: ['body', 'files', 'query', 'params']}),
      field = form.field,
      Filter = require('../helpers/request-filter'),
      i18n = require("i18n")

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

api.route('/search/criterias')
  .get((req, res) => {
    Dog.find().populate('sire dam images images.content awards').exec((err, dogs) => {
      if (err) {
        res.status(500)
        res.json({error: true, message: 'error.dogs.database'})
      } else {
        Award.find({}).exec((err, awards) => {
          if (err) {
            res.status(500)
            res.json({error: true, message: 'error.dogs.database'})
          } else {
            let litters = [...new Set(dogs.filter(dog => {
              return dog.litter && dog.litter !== 'undefined'
            }).map(dog => {
              return {title: dog.litter.name, value: dog.litter._id}
            }))]

            let sires = [...new Set(dogs.filter(dog => {
              return dog.sire && dog.sire !== 'undefined'
            }).map(dog => {
              return {title: dog.sire.name, value: dog.sire._id}
            }))]

            let dams = [...new Set(dogs.filter(dog => {
              return dog.dam && dog.dam !== 'undefined'
            }).map(dog => {
              return {title: dog.dam.name, value: dog.dam._id}
            }))]

            let years = [...new Set(dogs.map(dog => {
              return dog.dateOfBirth.getFullYear()
            }))].map(year => {
              return {title: year, value: year}
            })

            let disciplines = Dog.DISCIPLINES.map(discipline => {
              return {title: discipline.title, value: discipline.id}
            })

            let genders = [{title: i18n.__('admin.dogs.gender.female'), value: Dog.GENDERS.FEMALE}, {title: i18n.__('admin.dogs.gender.male'), value: Dog.GENDERS.MALE}]

            let colors = [...new Set(dogs.filter(dog => {
              return !!dog.color && typeof dog.color !== 'undefined'
            }).map(dog => {
              return dog.color
            }))].map(color => {
              return {title: color, value: color}
            })

            let titles = awards.filter(award => {
              return award.type === Award.TYPES.TITLE
            }).map(award => {
              return {value: award._id, title: award.title}
            })

            let certificates = awards.filter(award => {
              return award.type === Award.TYPES.CERTIFICATE
            }).map(award => {
              return {value: award._id, title: award.title}
            })

            const now = new Date();
            let ages = years.map(year => {
              const age = now.getFullYear() - year.value
              return {title: age, value: age}
            })

            const criterias = {
              litters: litters,
              sires: sires,
              dams: dams,
              years: years,
              disciplines: disciplines,
              genders: genders,
              colors: colors,
              titles: titles,
              certificates: certificates,
              ages: ages
            }

            res.status(200)
            res.json(criterias)
          }
        })
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
      field('certificate').ifNull(false),
      field('gender').ifNull('all'),
      field('color').ifNull('all'),
      field('litter').ifNull(false),
      field('sire').ifNull(false),
      field('dam').ifNull(false),
      field('year').ifNull(false)
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
      awards: {
        criteria: {$in: [handledForm.title, handledForm.certificate].filter(object => {
          return !!object
        })},
        shouldFilter: handledForm.title || handledForm.certificate
      },
      gender: {
        criteria: {$eq: handledForm.gender},
        shouldFilter: handledForm.gender !== 'all' && handledForm.gender !== ''
      },
      color: {
        criteria: {$regex: handledForm.color, $options: 'i'},
        shouldFilter: handledForm.color !== 'all' && handledForm.color !== ''
      },
      dateOfBirth: {
        criteria: {$gte: new Date(handledForm.year, 1, 0), $lte: new Date(handledForm.year, 12, 0)},
        shouldFilter: handledForm.year
      }
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
    Dog.findById({_id: req.params.dog}).populate('sire dam images images.content sire.images dam.images sire.images.content dam.images.content awards').lean().exec((err, dog) => {
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
          mapped[item.identifier] = item
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