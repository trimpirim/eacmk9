const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      SchemaHelper = require('../helpers/schema-helper')

const schema = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  identifier: SchemaHelper.withDefault(String, ''),
  shortContent: SchemaHelper.withDefault(String, ''),
  content: SchemaHelper.withDefault(String, ''),
  createdAt: SchemaHelper.withDefault(Date, Date.now),
  updatedAt: Date
 })

const DynamicContent = mongoose.model('DynamicContent', schema)

DynamicContent.TYPES = {
  ABOUT: 'about',
  SERVICES: 'services',
  BREEDING: 'breeding',
  TRAINING: 'training',
  DETECTION: 'detection',
  SECURITY: 'security'
}

module.exports = DynamicContent