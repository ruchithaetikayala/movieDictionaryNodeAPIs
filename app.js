const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controller/errorController')
const movieRouter = require('./routes/moviesRouter');

const app = express(); 

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

//Implement CORS
app.use(cors())
app.options('*',cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', movieRouter);

//Error handling for routes
app.all('*',(req,res,next)=>{
  const err = new Error(`Can't find route ${req.originalUrl} on this server`)
  err.statusCode = 404
  next(new AppError(`Can't find route ${req.originalUrl} on this server`,404))
})


// catch 404 and forward to error handler

// error handler
app.use(globalErrorHandler);


module.exports = app;
