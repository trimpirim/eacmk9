var express = require('express');
var imagesRouter = express.Router();
var ImageContent = require('../models/image-content');

imagesRouter.route('/display')
  .get(function(req, res) {
    var id = req.query.image;
    console.log("ID", id)
    ImageContent.findById({_id: id}).exec(function(err, imageContent) {
      if (err) throw err;
      console.log("IMAGE CONTENT", imageContent)

      res.writeHead(200, {'Content-type': imageContent.contentType});
      res.end(imageContent.content, 'binary');
    });
  });

module.exports = imagesRouter;