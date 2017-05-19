const LocalStrategy = require('passport-local').Strategy,
      User = require('./models/user.js')

const configuredPassport = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, username, password, done) => {
    User.findOne({
      'username': username,
    }, (err, user) => {
      if (err) 
        return done(err)

      if (!user) 
        return done(null, false, req.flash('loginMessage', 'No user found.'))

      if (!user.validPassword(password))
        return done(null, false, req.flash('loginMessage', 'Wrong password.'))

      return done(null, user)

    })
  }))
}

module.exports = configuredPassport