var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const globalMiddleware = require("./middlewares/globalMiddleware")

//Requerimos session
const session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var producersRouter = require('./routes/producers')
var adminRouter = require('./routes/admin')
var apiRouter = require("./routes/api/api")

var app = express();

var cors = require('cors');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({secret: 'Frase secreta Feria Sitio'}));
app.use(globalMiddleware.headerUser);

//cors
app.use(cors());



app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);
app.use('/productores', producersRouter)
app.use('/admin', adminRouter)
app.use('/api', apiRouter)

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
