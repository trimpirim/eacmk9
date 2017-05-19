// grab the things we need
const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const schemaOfUser = new Schema({
  username: String,
  password: String
})

schemaOfUser.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

schemaOfUser.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', schemaOfUser)

module.exports = User