const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      SchemaHelper = require('../helpers/schema-helper')

const TYPES = {
  TITLE: 1,
  CERTIFICATE: 2
}

const schema = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  type: SchemaHelper.withDefault(Number, TYPES.TITLE)
})

const Award = mongoose.model('Award', schema)

Award.TYPES = TYPES

module.exports = Award