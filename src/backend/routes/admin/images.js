var express = require('express');
var imagesRouter = express.Router();
var ImageContent = require('../../models/image-content');
var Dog = require('../../models/dog');
var DogImage = require('../../models/dog-image');
var formOfImageAdd = require('../../forms/dog/image/add');
var formOfImageEdit = require('../../forms/dog/image/edit');
var fs = require('fs');
var ImageConstants = require('../../constants/image-constants');

var routes = function(loggedMiddleware) {
  imagesRouter.route('/dog/:dog/add')
    .get(loggedMiddleware, function(req, res) {
      Dog.findById({_id: req.params.dog}, function(err, dog) {
        if (err) throw err;

        var dogImage = new DogImage();

        res.status(200);
        res.render('admin/dog/images/add', {dog: dog, dogImage: dogImage});
      });
    })
    .post([loggedMiddleware], function(req, res, next) {
      Dog.findById({_id: req.params.dog}, function(err, dog) {
        if (err) throw err;

        formOfImageAdd(req, res);
        var dogImage = new DogImage();
        dogImage.set(req.form);

        if (!req.form.isValid) {
          return res.render('admin/dog/images/add', {dog: dog, dogImage: dogImage, form: req.form});
        }

        var file = req.form.content;
        var imageContent = new ImageContent({relatedObjectType: ImageContent.RELATED_OBJECT_TYPES.PROJECT, relatedObject: req.params.dog});
        imageContent.content = file.data;
        imageContent.contentType = file.mimetype;
        imageContent.save(function(err, imageContent) {
          if (err) throw err;

          dogImage.content = imageContent._id;
          dogImage.save(function(err, dogImage) {
            if (err) throw err;

            dog.images.push(dogImage);
            dog.save(function(err, dog) {
              res.redirect(200, '/admin/dog/edit/' + dog._id);
            });
          });
        });
      });
    });

  imagesRouter.route('/dog/:dog/edit/:image')
    .get(loggedMiddleware, function(req, res) {
      Dog.findById({_id: req.params.dog}).populate('images').exec(function(err, dog) {
        if (err) throw err;
        DogImage.findById({_id: req.params.image}).populate('content').exec(function(err, dogImage) {
          if (err) throw err;
          ImageContent.findById({_id: dogImage.content._id}).exec(function(err, imageContent) {
            res.status(200);
            res.render('admin/dog/images/edit', {dog: dog, dogImage: dogImage, imageContent: imageContent});
          })
        })
      });
    })
    .post([loggedMiddleware], function(req, res, next) {
      Dog.findById({_id: req.params.dog}).populate('images').exec(function(err, dog) {
        if (err) throw err;
        DogImage.findById({_id: req.params.image}).populate('content').exec(function(err, dogImage) {
          if (err) throw err;
          ImageContent.findById({_id: dogImage.content._id}).exec(function(err, imageContent) {

            formOfImageEdit(req, res);
            dogImage.set(req.form);

            if (!req.form.isValid) {
              return res.render('admin/dog/images/edit', {dog: dog, dogImage: dogImage, form: req.form, imageContent: imageContent})
            }

            var file = req.form.content;
            if (file) {
              imageContent.content = file.data;
              imageContent.contentType = file.mimetype;

              imageContent.save();
            }

            dogImage.content = imageContent;
            dogImage.save();

            res.status(200);
            res.render('admin/dog/images/edit', {dog: dog, dogImage: dogImage, imageContent: imageContent});
          })
        })
      });
    });
  imagesRouter.route('/dog/:dog/delete/:image')
    .get(loggedMiddleware, function(req, res) {
      Dog.findById({_id: req.params.dog}).populate('images').exec(function(err, dog) {
        if (err) throw err;

        DogImage.findById({_id: req.params.image}).populate('content').exec(function(err, dogImage) {
          if (err) throw err;

          ImageContent.findById({_id: dogImage.content._id}).exec(function(err, imageContent) {
            if (err) throw err;

            imageContent.remove();
            dogImage.remove();

            var filtered = dog.images.filter(function(image) {
              return image._id != req.params.image;
            })

            dog.images = filtered;
            dog.save();

            res.redirect((filtered.length > 0) ? 200 : 400, '/admin/dog/edit/' + dog._id);
          })
        });
      });
    });
  imagesRouter.route('/upload')
    .post(loggedMiddleware, function(req, res) {
      var file = req.files.upload;
      var type = req.query.type;
      var relatedObject = req.query['related-object'];

      switch (type) {
        case ImageConstants.UPLOAD.PROJECT_DESCRIPTION: 
          var imageContent = new ImageContent({
            contentType: file.mimetype, 
            content: file.data, 
            relatedObjectType: ImageContent.RELATED_OBJECT_TYPES.PROJECT,
            relatedObject: relatedObject
          });

          imageContent.save(function(err, imageContent) {
            if (err) {
              res.status(500);
              return res.json({uploaded: 0, error: {message: 'Could not upload file'}});
            }

            res.status(200);
            res.json({uploaded: 1, fileName: imageContent._id, url: '/images/display?image=' + imageContent._id});
          });
          break;
        default: 
          res.status(500);
          return res.json({uploaded: 0, error: {message: 'No such type'}});
      }
    });

  return imagesRouter;
};

module.exports = routes;