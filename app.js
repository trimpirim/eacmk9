// Require our dependencies
const config = require('./src/backend/config'),
  express = require('express'),
  mongoose = require('./src/backend/mongoose')(config.DATABASE.USERNAME, config.DATABASE.PASSWORD, config.DATABASE.HOSTNAME, config.DATABASE.DATABASE),
  path = require('path'),
  routes = require('./src/backend/routes'),
  passport = require('passport'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  pug = require('pug'),
  configuredPassport = require('./src/backend/passport')(passport),
  flash = require("connect-flash"),
  fileUpload = require('express-fileupload'),
  MongoStore = require('connect-mongo')(session),
  i18n = require("i18n"),
  moment = require('moment'),
  Dog = require('./src/backend/models/dog'),
  Award = require('./src/backend/models/award')

// Create an express instance and set a port variable
const app = express()

let localeObject = {}

i18n.configure({
    locales:['en'],
    directory: __dirname + '/src/backend/locales',
    defaultLocale: 'en',
    register: localeObject,
    autoReload: true
})

app.use(i18n.init)

// Disable etag headers on responses
app.disable('etag')

app.use((req, res, next) => {
  req.pathOfRoot = __dirname
  // i18n.setLocale(res, 'en')
  next()
})

// Set /public as our static content dir
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(flash())

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(fileUpload())

app.set('view engine', 'pug')
app.set('views', path.join('./src/backend/views'))

app.use(session({
  secret: config.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/images', routes.images)
app.use('/api', routes.api)
app.use('/mocks', routes.mocks)
app.use('/admin', routes.admin(passport))

app.locals.moment = moment
app.locals.dogDisciplines = Dog.DISCIPLINES
app.locals.awardTypes = Award.TYPES
app.locals.dogGenders = Dog.GENDERS

app.get('*', routes.any)

module.exports = app

