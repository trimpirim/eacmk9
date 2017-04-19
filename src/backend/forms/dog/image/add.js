var form = require('express-form')
      .configure({dataSources: ['body', 'files', 'query', 'params']}),
    field = form.field;

module.exports = form(
  field('title').trim().required(),
  field('content').required()
);