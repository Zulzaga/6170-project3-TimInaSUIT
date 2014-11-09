/*
    Author: Zulsar Batmunkh
*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passwordHash = require('password-hash');

var User = require('./../model/user');
var Company = require('./../model/company');
var Review = require('./../model/review');
var Message = require('./../model/message');

var emailNotifier = require('./../helpers/email');


// Authenticates the user and sends a response saying "No logged in user!" if no user is logged in.
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }

    // If a user is not logged in, redirect to the login page.
    res.json({ error: "No logged in user!", success: false });
}

/*
    GET /messages
    Request parameters: empty
    Response:
        - success: true if the server succeeded in creating a new user, otherwise false
        - message: on success, contains formatted messages
        - err: on failure, an error message
*/
router.get('/', isAuthenticated, function(req, res) {
	Message.find({ from: req.user }).populate(['from', 'to']).exec(function (err, messagesSent) {
		if (err){
        	res.status(500).json({ error: "There was an error!", success: false });
        } else {
            Message.find({ to: req.user }).populate(['from', 'to']).exec(function (err, messagesReceived) {
                if (err){
                    res.status(500).json({ error: "There was an error!", success: false });
                } else {
                    res.json({ message: {sent: messagesSent.map(formatMessage), received: messagesReceived.map(formatMessage)}, success: true });
                }
            })
        }
	})
})

/*
    GET /messages/:messageId
    Request parameters:
        - messageId: id of the message
    Response:
        - success: true if successfully retrieved the message from the database 
        - message: on success, contains formatted message
        - err: on failure, an error message
*/
router.get('/:messageId', isAuthenticated, function(req, res) {
    Message.findOne({ _id: req.params.messageId, $or: [{ from: req.user}, { to: req.user}] }).populate(['from', 'to']).exec(function (err, message) {
        if (err) {
            res.status(500).json({ error: "There was an error!" });
        } else if (message === null){
            res.json({ error: "No message found!", success: false });
        } else {
            message = formatMessage(message);
            res.json({ 'message': message, success: true });
        }
    })
})

/*
    POST /messages
    Request body:
        - to: recipient username
        - content: content of the message
    Response:
        - success: true if the server succeeded in creating a new message, otherwise false
        - message: on success, contains successfully created message
        - err: on failure, an error message
*/
router.post('/', isAuthenticated, function(req, res) {
    User.findOne({ username: req.body.to }, function(err, recipient) {
        if (err) {
            res.status(500).json({ error: "There was an error!", success: false });
        } else if (recipient === null) {
            res.json({ error: "No such user found!", success: false });
        } else {
            if (req.user === recipient._id) {
                res.json({ error: "Cannot send a message to yourself!", success: false });
            } else {
                Message.create(req.user, recipient._id, req.body.content, function (err, message) {
                    if (err) {
                        res.status(500).json({ error: "There was an error!", success: false });
                    } else if (message === null){
                        res.json({ error: "Could not send a message!", success: false });
                    } else {
                        Message.findOne({ _id: message._id }).populate(['from', 'to']).exec(function (err, message) {
                            if (err) {
                                res.json({ error: "There was an error!", success: false });
                            }
                            emailNotifier.sendNotification(message.to);
                            res.json({ message: formatMessage(message), success: true });
                        });
                    }
                });
            }
        }
    })
})

/*
    DELETE /messages/:messageId
    Request parameters:
        - messageId: id of the message
    Response:
        - success: true if successfully deleted the message
        - message: on success, contains successfully deleted message
        - err: on failure, an error message
*/
router.delete('/:messageId', isAuthenticated, function(req, res) {
    Message.findOneAndRemove({ _id: req.params.messageId, $or: [{ from: req.user}, { to: req.user}] }).populate(['from', 'to']).exec(function (err, message) {
        if (err) {
            res.status(500).json({ error: "There was an error!" })
        } else if (message === null){
            res.json({ message: "Message does not exist.", success: false });
        } else {
            res.json({ message: formatMessage(message), success: true });
        }
    });
})

var formatUser = function (user) {
    return {
        _id: user._id,
        username: user.username
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

var formatReview = function (review) {
    return {
        _id: review._id,
        user: formatUser(review.user),
        company: review.company.name,
        rating: review.rating,
        details: review.details
    };
}

module.exports = router;