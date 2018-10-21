var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to mlabDB
mongoose.connect("mongodb://adminuser:Ades12joba1!@ds223812.mlab.com:23812/screeningdb");

//load all models
fs.readdirSync(__dirname+'/models').forEach(function(filename){
  if(~filename.indexOf('.js')){
    require(__dirname+'/models/'+filename);
  }
});

app.use(function(req, res, next){ 
  req.mongoose = mongoose;
  next();
});
 
app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);


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



app.listen(8080,()=>{console.log('App started on port 8080')});

module.exports = app;
