// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var SchemaHelper = require('../helpers/schema-helper');

var schemaOfLitter = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  createdAt: SchemaHelper.withDefault(Date, Date.now),
  updatedAt: Date
});

var Litter = mongoose.model('Litter', schemaOfLitter);

module.exports = Litter;