var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var DogImage = require('./dog-image');
var SchemaHelper = require('../helpers/schema-helper');

var schema = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  bio: SchemaHelper.withDefault(String, ''),
  createdAt: SchemaHelper.withDefault(Date, Date.now),
  updatedAt: Date,
  images: [
    SchemaHelper.withDefaultAndRef(ObjectId, new DogImage(), 'DogImage')
  ]
});

var Dog = mongoose.model('Dog', schema);

module.exports = Dog;