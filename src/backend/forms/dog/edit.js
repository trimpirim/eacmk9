var form = require('express-form'),
    field = form.field;

module.exports = form(
  field('title').trim().required(),
  field('bio').trim().required()
);