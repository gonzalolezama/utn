var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index'); //index.js
var usersRouter = require('./routes/users');
var manejadoresRouter = require('./routes/manejadores'); //routers/manejadores.js
var temporariosRouter = require('./routes/temporarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/manejadores', manejadoresRouter);
app.use('/temporarios', temporariosRouter);

app.get('/compra', function(req,res){
  res.send('Pagina con todos las propiedades a la venta')
})

app.get('/venta', function(req,res){
  res.send('si queres vender tu casa llamanos')
})

app.get('/alquiler', function(req,res){
  res.send('Pagina con todos las propiedades en alquiler')
})

app.get('/contacto', function(req,res){
  res.send('dejanos tu consulta')
})


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
