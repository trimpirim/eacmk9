const form = require('express-form'),
      field = form.field

const base = form(
  field('title').trim().required('', 'admin.dynamic_content.error.title.required'),
  field('shortContent').trim().required('', 'admin.dynamic_content.error.short_content.required'),
  field('content').trim().required('', 'admin.dynamic_content.error.content.required')
)

const forms = {
  dynamicContent: base
}

module.exports = forms
