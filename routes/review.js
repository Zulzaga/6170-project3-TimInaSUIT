/*
	Author: Yee Ling Gan
*/

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
var Review = require('../model/review');
var Company = require('../model/company');

var sess;

// Authenticates the user and redirects to the users login page if necessary.
function isAuthenticated(req, res, next) {
    if (req.user) {
        return next();
    }

    // If a user is not logged in, redirect to the login page.
    res.json({success: false, error: "User is not logged in!"});
};

/*
	GET '/reviews'
	No request parameters
	Response: 
		- success: true if server succeeded in getting all reviews
		- message: on succes, contains a list of review objects (which is all the reviews 
			available, each review object has 4 fields: user, company, details, rating
		- error: on failure, an error message
*/
router.get('/', isAuthenticated, function (req, res) {
	Review.find({}).populate(['user', 'company']).exec(function (e, docs){
		if (e){
			res.status(500).json({ success: false, error: "There was an error!" });
		}
		else{
			reviews = docs.map(formatReview);
			res.json({success: true, message: reviews});
		}
	});
});

/*
	POST '/reviews'
	Request body (all required):
		-company: the company name
		-rating: a Number for the review rating
		-details: a String representing the review content
	Response: 
		-message: the review just created
		-success: true if the server succeeds in creating the review
		-error: on failure, an error message 
*/
router.post('/', isAuthenticated, function (req, res){
	var company = req.body.company;
	var review_rating = req.body.rating;
	var review_details = req.body.details;
	var user_id = req.user;

	if (review_rating > 5 || review_rating < 0 || review_rating === null){
		res.json({success: false, error: 'Rating must be between 0 and 5!'});
	}
	else if (company === null || company === ''){
		res.json({success: false, error: 'You must enter a company!'});
	}
	else if (review_details === null || review_details ===''){
		res.json({success: false, error: 'You must enter your review details!'});
	}
	else{
		Company.findOne({name: company}).exec(function (error, company_docs){
			if (company_docs===null){
				res.json({success: false, error: "Company not found"});
			}
			else{
				//check if the user already has something posted for this company
				Review.findOne({company: company_docs._id, user: user_id}).exec(function (e, existing_review){
					if (e){
						console.log("1" + e);
						res.status(500).json({success: false, error: "There was an error!" });
					}
					else if(existing_review){
						res.json({success: false, error: "User already has a review for this company!" });
					}
					else{
						Review.create(user_id, company_docs._id, review_rating, review_details, function (err, review){
							if(err){
								console.log("2", err);
								res.status(500).json({success: false, error: "There was an error!" });
							}
							else{				
								//add review to company		
								company_docs.reviews.push(review._id);
								var count = company_docs.review_count;
								company_docs.save(function(e, saved_review){
									if (e){
										console.log("3" + e);
										res.status(500).json({success: false,  error : "There was an error!" });
									}
									else{
										Review.findOne({_id: review._id}).populate(['user', 'company']).exec(function (e, new_review){
											if (e){
												console.log("4" + e);
												res.status(500).json({success: false,  error : "There was an error!" });
											}
											new_review = formatReview(new_review);
											res.json({success: true, message: new_review});
										});	
									}
								});

							}
						});
					}
				});
				
			}
		})
		
	}
});

/*
	PUT "/reviews/:id"
	Request parameters: 
		-id: the id of the review to be edited
	Request body: 
		-rating: a Number representing the rating of the review
		-details: a String representing the content of the review
	Response: 
		-message: the review that was just edited
		-success: true if the server succeeds in editing the review
		-error: on failure, an error message 
*/
router.put('/:id', isAuthenticated, function (req, res) {	
	var review_id = req.params.id;
	var new_rating = req.body.rating;
	var review_details = req.body.details;
	if (new_rating > 5 || new_rating < 0){
		res.json({success: false, error: 'Rating must be between 0 and 5!'});
	}
	else if (review_details === null || review_details ===''){
		res.json({success: false, error: 'You must enter your review details!'});
	}
	else{
		Review.findOne({ _id : review_id, user: req.user}).populate(['user', 'company']).exec(function (e, reviews){
			console.log('found matching!');
			console.log(reviews);
			if (e){
				res.status(500).json({success: false,  error: "There was an error!"});
			}
			//if review doesn't exist 
			else if(reviews===null){
				res.status(500).json({success: false,  error: 'You are either not authorized or this review does not exist.'});
			}
			else{
				var original_rating = Number(reviews.rating);
				reviews.rating = req.body.rating;
				reviews.details = req.body.details;
				reviews.save(function (err, review){
					if (err){
						res.status(500).json({success: false, error: "There was an error!"});
					}
					else{
						var edited_review = formatReview(review);
						res.json({success: true, message: edited_review});
					}
				});
			}
		});
	}
});

/*
	DELETE '/reviews/:id'
	Request parameters:
		-id: the id of the review to be deleted
	Response: 
		-success: true if the server succeeds in deleting the review
		-error: on failure, an error message 
*/
router.delete('/:id', isAuthenticated, function(req, res){
	var review_id = req.params.id;
	Review.findOneAndRemove({_id: review_id, user: req.user}).exec(function (err, review){
		if (err){
			res.status(500).json({success: false, error: "There was an error!" });
		} 
		else if (review === null){
			res.json({error: 'You are either not authorized or this review does not exist.'});
		} 
		else {
			var company_Id = review.company;
			var review_rating = review.rating;
			Company.findOne({_id: company_Id}).exec(function (e, company){
				if (e){
					res.status(500).json({success: false, error: "There was an error!" });
				}
				else{
					//remove review from company
					var index = company.reviews.indexOf(review_id);
					company.reviews.splice(index, 1);
					company.save(function (er, docs){
						if (er){
							res.status(500).json({ success: false, error: "There was an error!"});
						}
						else{
							res.json({success: true, message: review_id});
						}
					});
				}
			});
		}
	});
});

/*
	GET '/reviews/:id'
	Request parameters:
		-id: the id of requested review
	Response: 
		- success: true if server succeeded in getting the review
		- message: on success, returns a json object with a review object, 
			with 4 fields: user, company, details, rating
		- error: on failure, an error message
*/
router.get('/:id', isAuthenticated, function (req, res){
	Review.findOne({_id: req.params.id}).populate(['user', 'company']).exec(function (err, reviews){
		if (err){
			res.status(500).json({success: false, error: "There was an error!"});
		}
		else{
			reviews = formatReview(reviews);
			res.json({success: true, message: reviews});
		}
	});
});

/*
	GET '/reviews/:userId/:companyId'
	Request parameters:
		-companyId: id of the company 
		**Must be logged in
	Response: 
		-success: true if there is a review made by the user for the company,
				  false otherwise
		-message: on success, return  a json object with the single review object
*/
router.get('/currentUser/:companyId', isAuthenticated, function (req, res){
	console.log('trying to see if the currentUser has a review for this company');

	var user_id = req.user;
	var companyId = req.params.companyId;

	Review.findOne({user: user_id, company: companyId}).exec(function (err, review){
		console.log(review);
		if (review){
			var found_review = formatReview(review);
			res.json({success: true, message: found_review});
		}
		else{
			res.json({success: false, error: "no review made yet"});
		}
	});
});

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

var formatReview = function (review){
	return {
		_id : review._id, 
		user : formatUser(review.user), 
		company : formatCompany(review.company), 
		rating : review.rating, 
		details : review.details
	}
};

module.exports = router;
