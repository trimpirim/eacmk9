// grab the things we need
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      SchemaHelper = require('../helpers/schema-helper')

const schemaOfLitter = new Schema({
  name: SchemaHelper.withDefault(String, ''),
  createdAt: SchemaHelper.withDefault(Date, Date.now),
  updatedAt: Date
})

const Litter = mongoose.model('Litter', schemaOfLitter)

module.exports = Litter