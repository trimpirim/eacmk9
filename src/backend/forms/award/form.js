const form = require('express-form')
        .configure({dataSources: ['body', 'files', 'query', 'params']}),
      field = form.field

const forms = {
  award: form(
    field('title').trim().required('', 'admin.dogs.award.error.title.required'),
    field('type').trim().required('', 'admin.dogs.award.error.title.required')
  )
}

module.exports = forms
