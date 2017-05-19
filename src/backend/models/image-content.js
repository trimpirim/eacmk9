const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId

const schema = new Schema({
  content: Buffer, 
  contentType: String,
  relatedObjectType: Number,
  relatedObject: {
    type: ObjectId
  },
})

const ImageContent = mongoose.model('ImageContent', schema)
ImageContent.RELATED_OBJECT_TYPES = {
  DOG: 1,
  LITTER: 2,
}

module.exports = ImageContent