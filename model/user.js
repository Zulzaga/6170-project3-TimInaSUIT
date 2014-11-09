/*
    Author: Zulsar Batmunkh
*/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types;
var passwordHash = require('password-hash');

var userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true}
});

userSchema.statics.create = function(username, password, email, callback) {
	password = passwordHash.generate(password);
    var newUser = new User({
        'username': username,
        'password': password,
        'email': email
    });

    newUser.save(callback);
}

var User = mongoose.model('User', userSchema);

var checkLength = function(s) {
	if (s) {
		return s.length > 0;
	} else {
		return false;
	}
};

var checkEmail = function(s){
    var emailRegex = /\w+@mit.edu/;
    return emailRegex.test(s);
}

User.schema.path('username').validate(checkLength, "Username cannot be empty");
User.schema.path('password').validate(checkLength, "Password cannot be empty");
User.schema.path('email').validate(checkEmail, "Please enter a valid email");

module.exports = User;

