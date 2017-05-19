const express = require('express'),
      imagesRouter = express.Router(),
      ImageContent = require('../models/image-content')

imagesRouter.route('/display')
  .get((req, res) => {
    const id = req.query.image
    console.log("ID", id)
    ImageContent.findById({_id: id}).exec((err, imageContent) => {
      if (err) throw err
      res.writeHead(200, {'Content-type': imageContent.contentType})
      res.end(imageContent.content, 'binary')
    })
  })

module.exports = imagesRouter