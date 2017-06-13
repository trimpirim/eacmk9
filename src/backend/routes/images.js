const express = require('express'),
      imagesRouter = express.Router(),
      ImageContent = require('../models/image-content'),
      ObjectId = require('mongoose').Types.ObjectId

imagesRouter.route('/display')
  .get((req, res) => {
    let id = req.query.image
    let relatedObject = req.query.relatedObject
    let relatedObjectType = req.query.relatedObjectType

    id = (id && typeof id !== 'undefined' && id !== 'undefined') ? id : false
    relatedObject = (relatedObject && typeof relatedObject !== 'undefined' && relatedObject !== 'undefined') ? relatedObject : false
    relatedObjectType = (relatedObjectType && typeof relatedObjectType !== 'undefined' && relatedObjectType !== 'undefined') ? relatedObjectType : false


    let query = [];
    if (id) {
      query.push({_id: id})
    }
    if (relatedObject) {
      query.push({$and: [{relatedObject: relatedObject, relatedObjectType: ImageContent.RELATED_OBJECT_TYPES.DOG}]})
    }

    if (query.length > 0) {
      ImageContent.findOne({$or: query}).exec((err, imageContent) => {
        if (err) throw err
        if (imageContent) {
          res.writeHead(200, {'Content-type': imageContent.contentType})
          res.end(imageContent.content, 'binary')
        } else {
          res.writeHead(404)
          res.end()
        }
      })
    } else {
      res.writeHead(404);
      res.end();
    }
  })

module.exports = imagesRouter