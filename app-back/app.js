var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gruposRouter = require('./routes/grupo');
var tallerRouter = require('./routes/taller');
var publicacionRouter = require('./routes/publicacion');
var robosRouter = require('./routes/robo');
var serviciosRouter = require('./routes/servicio');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/back/grupos/', gruposRouter);
app.use('/back/talleres/', tallerRouter);
app.use('/publicaciones', publicacionRouter);

app.use('/servicios', serviciosRouter);

app.use('/robos', robosRouter);


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
