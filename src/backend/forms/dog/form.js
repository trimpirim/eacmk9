const form = require('express-form')
        .configure({dataSources: ['body', 'files', 'query', 'params']}),
      field = form.field,
      moment = require('moment')

const mongoose = require('mongoose')

const dog = form(
  field('name').trim().required('', 'admin.dogs.error.name.required'),
  field('dateOfBirth').trim().required('', 'admin.dogs.error.date_of_birth.required').custom((value) => {
    return moment(value, "YYYY/MM/DD")
  }).isDate('admin.dogs.error.date_of_birth.not_valid_date'),
  field('color').trim().required('', 'admin.dogs.error.color.required'),
  field('discipline').trim().required('', 'admin.dogs.error.discipline.required'),
  field('gender').trim().required('', 'admin.dogs.error.gender.required'),
  field('puppy'),
  field('sire'),
  field('dam'),
  field('bio').trim().required('', 'admin.dogs.error.bio.required')
)

const puppy = form(
  field('name').trim().required('', 'admin.dogs.error.name.required'),
  field('dateOfBirth').trim().required('', 'admin.dogs.error.date_of_birth.required').custom((value) => {
    return moment(value, "YYYY/MM/DD")
  }).isDate('admin.dogs.error.date_of_birth.not_valid_date'),
  field('color').trim().required('', 'admin.dogs.error.color.required'),
  field('discipline').trim().required('', 'admin.dogs.error.discipline.required'),
  field('gender').trim().required('', 'admin.dogs.error.gender.required'),
  field('puppy'),
  field('litter').trim().required('', 'admin.dogs.error.litter.required'),
  field('sire').trim().required('', 'admin.dogs.error.sire.required'),
  field('dam').trim().required('', 'admin.dogs.error.dem.required'),
  field('available'),
  field('evaluation').trim().required('', 'admin.dogs.error.evaluation.required'),
  field('bio').trim().required('', 'admin.dogs.error.bio.required')
)

const forms = {
  dog: dog,
  puppy: puppy,
  image: {
    create: form(
      field('title').trim().required('', 'admin.dogs.image.error.title.required'),
      field('content').required('', 'admin.dogs.image.error.content.required')
    ),
    edit: form(
      field('title').trim().required('', 'admin.dogs.image.error.title.required'),
      field('content')
    )
  },
  award: form(
    field('award').trim().required('', 'admin.dogs.error.award.required')
  ),
  filter: {
    form: form(
      field('name').trim().ifNull(false),
      field('puppy').ifNull('all'),
      field('litter').ifNull(false)
    ),
    parseRequest: (form) => {
      const filter = {}
      if (form.puppy !== 'all') {
        filter.puppy = {$eq: !!+form.puppy}
      } 
      if (form.name !== false) {
        filter.name = {$regex: form.name, $options: 'i'}
      }
      if (form.litter !== false) {
        filter.litter = form.litter
      }

      return filter
    },
    CONSTANTS: {
      ALL: '',
      PUPPIES: 1,
      ADULTS: 0
    }
  }
}

module.exports = forms
