const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/index.js');
const app = express();

//reqire routes folder
const index = require('./routes/index');

mongoose.connect(config.mongodbLocalHostUrl,{ useNewUrlParser: true });
//mongoose.connect(config.mongodbMlabUrl, { useNewUrlParser: true });

//handle mongodb error
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connected to DataBase...");
});

app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(cookieSession({
  name: 'session',
  keys: ['abc', 'xyz']
}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/', index);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
});

module.exports = app;
