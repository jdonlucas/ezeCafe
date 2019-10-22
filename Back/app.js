const passportConf = require('./passport');
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter  = require('./routes/users');
var stockRouter = require('./routes/stock');
var insumosRouter = require('./routes/insumos');
var menuRouter = require('./routes/menu');
var baseUrl = "/api";
var dotenv = require('dotenv').config();

var cors = require('cors');
var app = express();

<<<<<<< HEAD
app.use(cors({credentials: true, origin: 'http://negocio.ezecafe.com.mx'}));
=======
app.use(cors({credentials: true, origin: 'http://localhost:8000'})); // for development
//app.use(cors({credentials: true, origin: 'http://negocio.ezecafe.com.mx'})); // for production
<<<<<<< HEAD
>>>>>>> 0f1abf1f85a6c9fd86e47fa8c7ddc03cd02f9d44
=======
>>>>>>> 034fbeb00c57687300eb499422647be794b44ee4
>>>>>>> 1f71c9882d2db54cb24d66edf12f93ec19d01bac
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}/stock`, stockRouter);
app.use(`${baseUrl}/insumos`, insumosRouter);
app.use(`${baseUrl}/menu`, menuRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
