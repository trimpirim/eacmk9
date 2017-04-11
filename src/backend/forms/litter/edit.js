var form = require('express-form'),
    field = form.field,
    Litter = require('../../models/litter');

module.exports = form(
  field('title').trim().required()
);