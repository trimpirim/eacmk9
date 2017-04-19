var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var ImageContent = require('./image-content');
var SchemaHelper = require('../helpers/schema-helper');

var schema = new Schema({
  title: SchemaHelper.withDefault(String, ''),
  content: SchemaHelper.withRef(ObjectId, 'ImageContent')
});

var DogImage = mongoose.model('DogImage', schema);

module.exports = DogImage;