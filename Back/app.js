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
var orderRouter = require('./routes/order');
var salesRouter = require('./routes/sales');
var adsRouter = require('./routes/bulletinBoard');
var baseUrl = "/api";
var dotenv = require('dotenv').config();

var cors = require('cors');
var app = express();

//app.use(cors({credentials: true, origin: 'http://localhost:8000'})); // for development
app.use(cors({credentials: true, origin: 'https://negocio.ezecafe.com.mx'})); // for production

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
app.use(`${baseUrl}/sales`, salesRouter);
app.use(`${baseUrl}/order`, orderRouter);
app.use(`${baseUrl}/ads`, adsRouter);

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
