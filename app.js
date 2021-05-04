let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//Routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let siparisRouter = require('./routes/siparisler');

let app = express();

//Config
let config = require('./Config');
app.set('api_key',config.api_key);

//MiddleWare
let middleware = require('./middleware/verifyToken');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api',middleware);
app.use('/api/users', usersRouter);
app.use('/api/siparisler', siparisRouter);

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



/*
Middleware Örneği
app.use('/users',(req,res,next)=>{
  const isLogin = false;
  if(isLogin) {
    next()
  } else {
    res.send("Lütfen Giriş Yapınız")
  }
})
 */
