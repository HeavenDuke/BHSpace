var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var flash = require('connect-flash');
global.config = require('./config');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser(global.config.session_secret));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: global.config.session_secret,
  resave: true,
  saveUninitialized: true,
  store: new redisStore({
    host: global.config.redis.host,
    port: global.config.redis.port
  }),
  cookie: {maxAge: 1000 * 60 * 60 * 24} //null to create a browser-session
}));
app.use(flash());

app.use('/', function(req, res, next) {
  console.log(req.sessionID)
  res.render('index', { title: 'Express' })
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(err.status || 500);
    res.render('index', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message);
  res.render('index', {
    message: err.message,
    error: {}
  });
});

var server = app.listen(3000, function() {
  console.log("Server listening at: " + server.address().address + ":" + server.address().port);
});

global.db = require('./database')(
    global.config.mysql.database,
    global.config.mysql.username,
    global.config.mysql.password,
    global.config.mysql.config
);
global.db.sync();


module.exports = app;