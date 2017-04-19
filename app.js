// Require our dependencies
var config = require('./src/backend/config'),
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
  MongoStore = require('connect-mongo')(session);

// Create an express instance and set a port variable
var app = express();

// Disable etag headers on responses
app.disable('etag');

app.use(function(req, res, next) {
  req.pathOfRoot = __dirname;
  next();
});

// Set /public as our static content dir
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(flash());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(fileUpload());

app.set('view engine', 'pug');
app.set('views', path.join('./src/backend/views'));

app.use(session({
  secret: config.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/images', routes.images);
app.use('/api', routes.api);
app.use('/mocks', routes.mocks);
app.use('/admin', routes.admin(passport));

app.get('*', routes.any);

module.exports = app;

