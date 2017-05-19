const form = require('express-form'),
      field = form.field

const base = form(
  field('name').trim().required('', 'admin.litters.error.name.required')
)

const forms = {
  create: base,
  edit: base
}

module.exports = forms
