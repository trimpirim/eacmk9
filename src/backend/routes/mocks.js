const express = require('express'),
    User = require('../models/user')

const mocks = express.Router()

mocks.route('/add-admin')
  .get((req, res) => {
    const user = new User()
    user.username = 'admin'
    user.password = user.generateHash('admin')
    user.save((err, result) => {
      if (err) throw err

      res.status(200)
      res.send('SUCCESS')
    })
  })

module.exports = mocks