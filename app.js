var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// dotENV
require('dotenv').config()

// standard Express Routes
var indexRouter = require('./routes/index');

// The Routes we're using
var formHandlerRouter = require('./routes/formhandler');
var checkoutRouter = require('./routes/checkout');
var getordersRouter = require('./routes/getorders');
var successRouter = require('./routes/success');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

// deal with form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routers
app.use('/', indexRouter);
app.use('/formhandler', formHandlerRouter);
app.use('/checkout', checkoutRouter);
app.use('/getorders', getordersRouter);
app.use('/success', successRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
