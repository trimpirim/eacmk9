const express = require('express'),
      router = express.Router(),
      ImageContent = require('../../models/image-content'),
      fs = require('fs'),
      ImageConstants = require('../../constants/image-constants')

const routes = function(loggedMiddleware) {
  router.route('/upload')
    .post(loggedMiddleware, (req, res) => {
      const file = req.files.upload
      const type = req.query.type
      const relatedObject = req.query['related-object']

      switch (type) {
        case ImageContent.RELATED_OBJECT_TYPES.DOG: 
          const imageContent = new ImageContent({
            contentType: file.mimetype, 
            content: file.data, 
            relatedObjectType: ImageContent.RELATED_OBJECT_TYPES.DOG,
            relatedObject: relatedObject
          })

          imageContent.save((err, imageContent) => {
            if (err) {
              res.status(500)
              return res.json({uploaded: 0, error: {message: 'Could not upload file'}})
            }

            res.status(200)
            res.json({uploaded: 1, fileName: imageContent._id, url: '/images/display?image=' + imageContent._id})
          })
          break
        default: 
          res.status(500)
          return res.json({uploaded: 0, error: {message: 'No such type'}})
      }
    })

  return router
}

module.exports = routes