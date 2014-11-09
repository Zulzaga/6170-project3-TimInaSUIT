var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var passwordHash = require('password-hash');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;

var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var companies = require('./routes/company');
var messages = require('./routes/messages');
var reviews = require('./routes/review');

var User = require('./model/user');

var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var connection_string = 'mongodb://localhost/timinsuit';

if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connection_string = 'mongodb://' + 
        process.env.OPENSHIFT_MONGODB_DB_USERNAME + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + '@' +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/timinsuit';
}

mongoose.connect(connection_string);
var db = mongoose.connection;

db.on('error', function(msg){
    console.log('Mongoose connection error %s', msg);
});

db.once('open', function(){
    console.log('Mongoose connection established');
});

var debug = require('debug')('mymongo');

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", null);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
 });

// view engine setup;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "top secret", saveUninitialized: true, resave: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/companies', companies);
app.use('/messages', messages);
app.use('/reviews', reviews);

passport.use('login', new LocalStrategy({
    passReqToCallback: true
    }, function(req, username, password, done) {
        if (req.user) {
            return done(null, req.user);
        } else {
            // find a user in Mongo with provided username
            User.findOne({'username': username}, function(err, user) {
                // In case of any error return
                if (err){
                    return done(err);
                }
                // already exists
                if (!user) {
                    return done(null, false, {error: 'User does not exist', success: false});
                } else {
                    if (!passwordHash.verify(password, user.password)) {
                        return done(null, false, {error: 'Wrong username and password combination!', success: false});
                    }

                    return done(null, user);
                }
            });
        }
    }
));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
    },
    function(req, username, password, done) {
        console.log(req.body.password);
        if (req.user) {
            return done(null, req.user);
        } else {
            // find a user in Mongo with provided username
            User.findOne({'username': username}, function(err, user) {
                // In case of any error return
                if (err){
                    return done(err);
                }
                // already exists
                if (user) {
                    return done(null, false, {error: 'User already exists', success: false});
                } else {
                    // if there is no user with that email
                    // create the user
                    User.create(req.body.username, req.body.password, req.body.email, function (err, user) {
                        if (err) {
                            return done(err);
                        } else if (user === null){
                            return done(null, false, { error: "Could not create a new user!", success: false });
                        } else {
                            return done(null, user);
                        }
                    })
                }
            });
        }
    }
));

passport.serializeUser(function(user, next) {
    // store user id
    next(null, user._id);
});

passport.deserializeUser(function(id, next) {
    next(null, id);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = process.env.OPENSHIFT_NODEJS_PORT;
var ip = process.env.OPENSHIFT_NODEJS_IP;

app.listen(port || 3000, ip);

module.exports = app;
