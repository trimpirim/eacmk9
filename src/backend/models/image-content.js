var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var schema = new Schema({
  content: Buffer, 
  contentType: String,
  relatedObjectType: Number,
  relatedObject: {
    type: ObjectId
  },
});

var ImageContent = mongoose.model('ImageContent', schema);
ImageContent.RELATED_OBJECT_TYPES = {
  DOG: 1,
  LITTER: 2,
};

module.exports = ImageContent;