var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var eventsCount = require('./routes/eventsCount');
var athlNumChange = require('./routes/athlNumChange');
const growthPercAthl = require('./routes/growthPercAthl');
const genderParticipation = require('./routes/genderPart');
const genderRatio = require('./routes/genderRatio');
const contrMedTally = require('./routes/contrMedTally');
const avgages = require('./routes/avgages');
const topMedalWinners = require('./routes/topMedalWinners');
const otherInsights = require('./routes/otherInsights');
const Games = require('./routes/pages/gamesPage');
const lists = require('./routes/generalQueries');
const countriesPage = require('./routes/pages/countriesPage');
const athletesPage = require('./routes/pages/athletesPage');
const sportsPage = require('./routes/pages/sportsPage');
const filterPage = require('./routes/pages/filterPage');

const authentication = require('./utils/auth');

// process.env['PATH'] = path.join(__dirname, '/instantclient_18_1') + ';' + process.env['PATH'];

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(authentication);

app.use(function(req, res, next){
  console.log("req");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', eventsCount);
app.use('/athlnumchange', athlNumChange);
app.use('/athlgrowthperc', growthPercAthl);
app.use('/genderpart', genderParticipation);
app.use('/genderratio', genderRatio);
app.use('/countrytally', contrMedTally);
app.use('/avgage', avgages);
app.use('/topmedalwinners', topMedalWinners);
app.use('/otherinsights', otherInsights);
app.use('/lists', lists);
app.use('/games', Games);
app.use('/countries', countriesPage);
app.use('/athletes', athletesPage);
app.use('/sports', sportsPage);
app.use('/home', filterPage);

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
