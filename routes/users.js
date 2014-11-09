/*
    Author: Zulsar Batmunkh
*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var passport = require('passport');

var User = require('./../model/user');
var TempUser = require('./../model/confirmation');
var Company = require('./../model/company');
var Review = require('./../model/review');
var Message = require('./../model/message');

var emailNotifier = require('./../helpers/email');

/// Authenticates the user and sends a response saying "No logged in user!" if no user is logged in.
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    res.json({ error: "No logged in user!", success: false });
}

// This is specifically for TESTING purpose, we'll delete it for the final phase.
router.get('/', function(req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).json({ error: "There was an error!", success: false });
        } else {
            res.json({ message: users, success: true });
        }
    });
})

/*
    GET /users/current
    Request parameters: empty
    Response:
        - success: true if there's a user logged in
        - user: on success, contains formatted user info
        - error: on failure, an error message
*/
router.get('/current', isAuthenticated, function(req, res) {
    User.findById(req.user, function (err, user) {
        if (err) {
            res.status(500).json({ error: "There was an error!", success: false });
        } else if (user !== null){
            res.json({ user: formatUser(user), success: true });
        } else {
            res.json({ success: false });
        }
    });
});

/*
    GET /users/logout
    Request parameters: empty
    Response:
        - success: true
*/
router.get('/logout', function(req, res){
    if (req.user) {
        req.logout();
    }
    
    res.redirect('/users/');
});

/*
    GET /users/:username
    Request parameters:
        - userId: id of the user
    Response:
        - success: true if the login was successful, otherwise false
        - message: on success, contains the formatted user
        - err: on failure, an error message
*/
router.get('/:userId', isAuthenticated, function(req, res) {
	User.findById( req.params.userId, function (err, user) {
        if (err){
        	res.status(500).json({ error: 'There was an error!', success: false })
        } else if (user === null) {
        	res.json({ error: "No such user exists!", success: false });
        } else {
        	res.json({ message: formatUser(user), success: true });
        }
    });
})

/*
    GET /users/:userId/reviews
    Request parameters:
        - userId: id of the user
    Response:
        - success: true if successfully retrieved given user's reviews from database, otherwise false
        - message: on success, containg formatted reviews
        - err: on failure, an error message
*/
router.get('/:userId/reviews', isAuthenticated, function(req, res) {
    Review.find({ user: req.params.userId }).populate(['user', 'company']).exec(function (err, reviews) {
        if (err){
            res.status(500).json({ error: "There was an error!", success: false })
        } else {
            reviews = reviews.map(formatReview);
            res.json({ message: reviews, success: true });
        }
    })
})

/*
    GET /users/:userId/reviews/:reviewId
    Request parameters:
        - userId: id of the user
        - reviewId: id of the review
    Response:
        - success: true if successfully retrieved given user's given review from database, otherwise false
        - message: on success, contains formatted review
        - err: on failure, an error message
*/
router.get('/:userId/reviews/:reviewId', isAuthenticated, function(req, res) {
    Review.findOne({ _id: req.params.reviewId, user: req.params.userId }).populate(['user', 'company']).exec( function (err, review) {
        if (err){
            res.status(500).json({ error: "There was an error!", success: false })
        } else if (review == null) {
            res.json({ message: "No such review found!", success: false });
        } else {
            review = formatReview(review);
            res.json({ message: review, success: true });
        }
    })
});

/*
    POST /users/login
    Request body:
        - username
        - password
    Response:
        - success: true if the login was successful, otherwise false
        - message: on success, contains successful message
        - err: on failure, an error message
*/
router.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, newUser, info){
        if (err) {
            res.status(500).json({ error: "There was an error!", success: false })
        } else if (!newUser){
            res.json(info);
        } else {
            req.logIn(newUser, function(err) {
                if (err) { 
                    res.status(500).json({ error: "There was an error!", success: false }); 
                } else {
                    res.json({ user: formatUser(newUser), success: true });
                }
            }); 
        }
    })(req, res, next);
});

/*
    POST /users/
    Request body:
        - username
        - password
    Response:
        - success: true if the server succeeded in creating a new user, otherwise false
        - message: on success, contains successful message
        - err: on failure, an error message
*/
router.post('/', function(req, res) {
    if (req.session.user) {
        res.redirect('/');
    } else {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                res.status(500).json({ error: "There was an error!", success: false })
            } else if (user === null){
                TempUser.findOne({ username: req.body.username }, function (err, user) {
                    if (err){
                        res.status(500).json({ error: "There was an error!", success: false })
                    } else if (user === null) {
                        TempUser.create(req.body.username, req.body.password, req.body.email, function (err, user) {
                            if (err) {
                                if (err.errors && err.errors.email && err.errors.email.message) {
                                    res.json({ error: err.errors.email.message, success: false });
                                } else {
                                    res.status(500).json({ error: "There was an error!", success: false });
                                }
                            } else if (user === null){
                                res.json({ error: "Could not create a new user!", success: false });
                            } else {
                                res.json({ message: "Please check your MIT email to activate your account.", success: true });
                                emailNotifier.sendNotification(user);
                            }
                        });
                    } else {
                        res.json({ error: "User with the same username already exists!", success: false });
                    }
                });
            } else {
                res.json({ error: "User with the same username already exists!.", success: true });
            }
        });
    }
});

/*
    GET /users/activate
    Request parameters:
        - userId: id of account to activate
    Response:
        - success: true if the server succeeded in creating a new user, otherwise false
        - message: on success, contains successful message
        - err: on failure, an error message
*/

router.get('/activate/:id', function(req, res, next) {
    if (req.user) {
        res.redirect('/');
    } else {
        TempUser.findByIdAndRemove(req.params.id, function (err, user) {
            if (err){
                res.status(500).json({ error: "There was an error!", success: false })
            } else if (user === null) {  
                res.status(500).json({ error: "Your activation ID expired. Please sign up again.", success: false });
            } else {
                req.body.username = user.username;
                req.body.password = user.password;
                req.body.email = user.email;
                passport.authenticate('signup', function(err, newUser, info){
                    if (err) {
                        res.status(500).json({ error: "There was an error!", success: false });
                    } else if (!newUser){
                        res.json(info);
                    } else {
                        req.logIn(newUser, function(err) {
                          if (err) { 
                                res.status(500).json({ error: "There was an error!", success: false });
                          } else {
                                res.redirect('/');
                          }
                        }); 
                    }
                })(req, res, next);
            }
        });
    }
})

var formatUser = function (user) {
    return {
        _id: user._id,
        username: user.username
    };
}

var formatCompany = function (company) {
    return {
        _id: company._id,
        name: company.name
    };
}

var formatReview = function (review) {
    return {
        _id: review._id,
        user: formatUser(review.user),
        company: formatCompany(review.company),
        rating: review.rating,
        details: review.details
    };
}

var formatMessage = function (message) {
    return {
        _id: message._id,
        from: formatUser(message.from),
        to: formatUser(message.to),
        content: message.content
    };
}

var handleValidateError = function(res, errors, redirURL) {
    for (var key in errors) {
        if (errors.hasOwnProperty(key)) {
            res.json(errors[key].message);
        }
    }
};

module.exports = router;
