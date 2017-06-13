const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      ImageContent = require('./image-content'),
      SchemaHelper = require('../helpers/schema-helper')

const schema = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  content: SchemaHelper.withRef(ObjectId, 'ImageContent')
})

const autoPopulateParents = function(next) {
  this.populate('content')
  next()
}

schema
  .pre('find', autoPopulateParents)
  .pre('findOne', autoPopulateParents)

const DogImage = mongoose.model('DogImage', schema)

module.exports = DogImage