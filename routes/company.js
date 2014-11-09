/*
	Author: Kapaya Katongo
*/

var express = require('express');
var router = express.Router();
var Company = require('./../model/company');
var Review = require('../model/review');

// Authenticates the user and redirects to the users login page if necessary.
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }
    // If a user is not logged in, redirect to the login page.
    res.json({success: false, error: "User is not logged in!"});
}

// Calculates the rating of a company
function calculateCompanyRating(company){
	rating_total = 0
	number_of_reviews = 0

	company.reviews.forEach(function(review){
		rating_total += Number(review.rating);
		number_of_reviews += 1	
	});

	if (number_of_reviews == 0){
		return 0;
	} else {
		return Math.round((rating_total / number_of_reviews) * 10) / 10;
	}
};

var formatUser = function (user) {
    return {
        _id: user._id,
        username: user.username
    };
}

// Format company
var formatCompany = function (company, formated_reviews){
	return {
		_id : company._id, 
		name : company.name, 
		about : company.about, 
		rating : calculateCompanyRating(company),
		reviews : formated_reviews
	}
};

// Format companies
var formatCompanies = function (company){
	return {
		_id : company._id, 
		name : company.name, 
		about : company.about, 
		rating : calculateCompanyRating(company),
		reviews : company.reviews
	}
};



var formatReview = function (review){
	return {
		_id : review._id, 
		user : formatUser(review.user), 
		company : formatCompany(review.company), 
		rating : review.rating, 
		details : review.details
	}
};

/*
	GET '/companies'
	No request parameters
	Response: 
		- success: true if server succeeded in getting all companies
		- message: on succes, contains a list of company objects (which is all the companies 
			available, each company object has 4 fields: name, about, rating, reviews
		- error: on failure, an error message
*/
router.get('/', isAuthenticated, function(req, res) {
	Company.find({}).sort({name: 1}).populate(['reviews']).exec(function(err, docs){
		if (err){
			res.send(500).json({error: 'Could not find / populate companies.', success: false});
		} else {
			companies = docs.map(formatCompanies);
			res.json({success: true, message: companies});
		}
	});
});

/*
	POST '/companies'
	Request body (all required):
		-name: the company name
		-about: information about the company
	Response: 
		-success: true if the server succeeds in creating the company
		-message: newly created company object
		-error: on failure, an error message 
*/
router.post('/', isAuthenticated, function(req, res) {
	Company.findOne({name: req.body.name}, function(err, company){
		if (err){
			res.status(500).json({error: 'There was an error while creating the company', success: false});
		} else if (company){
			res.status(500).json({error: 'Company already in system!', success: false});
		} else {
			Company.create(req.body.name, req.body.about, function(err, company){
				if (err){
					res.json({error: 'Could not create new Company', success: false});
				} else {
					formated_company = formatCompany(company, []);
					res.json({success: true, message: formated_company});
				}
			});
		}
	});
});

/*
	GET '/companies/:id'
	Request parameters:
		-id: the id of requested company
	Response: 
		- success: true if server succeeded in getting the company
		- message: on succes, returns a json object with a company object, 
			with 4 fields: name, about, rating, reviews
		- error: on failure, an error message
*/
router.get('/:id', isAuthenticated, function(req, res) {
	Company.findOne({_id: req.params.id}).populate(['reviews']).exec(function(err, doc){
		if (err){
			res.status(500).json({error: 'Could not find / populate company', success: false});
		} else if (doc === null){
			res.status(500).json({error: 'Could not find company', success: false});
		} else {
			Review.find({company: doc._id}).populate(['user', 'company']).exec(function (e, docs){
				if (e){
					res.json({error: 'Could not populate company reviews', success: false});
				}
				else{
					formated_reviews = docs.map(formatReview);
					company = formatCompany(doc, formated_reviews);
					res.json({success: true, message: company });
				}
			});
		}
	});
});

/*
	DELETE '/companies/:id'
	Request parameters:
		-id: the id of requested company
	Response: 
		- success: true if server succeeded in deleing the company
		- message: 'Successfully deleted company!''
		- error: on failure, an error message
*/
router.delete('/:id', isAuthenticated, function(req, res) {
	Company.findOneAndRemove({_id: req.params.id}).exec(function(err, doc){
		if (err){
			res.status(500).json({error: 'Could not delete company', success: false});
		} else if (doc == null) {
			res.status(500).json({error: 'Could not find company', success: false});
		} else {
			res.json({success: true, message: 'Successfully deleted company!'});
		}
	});
});



module.exports = router;