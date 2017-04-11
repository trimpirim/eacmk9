// grab the things we need
var mongoose = require('mongoose'),
  bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var schemaOfUser = new Schema({
  username: String,
  password: String
});

schemaOfUser.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

schemaOfUser.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', schemaOfUser);

module.exports = User;