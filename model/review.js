/*
  Author: Yee Ling Gan
*/

var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
	user: {type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
   	company: {type:mongoose.Schema.Types.ObjectId, ref: 'Company', required: true},
   	rating: {type: Number, required: true},
   	details: {type: String, required: true}
});

reviewSchema.statics.create = function(user_id, company_id, review_rating, review_details, callback) {
    var newReview = new Review({
        user: user_id,
        company: company_id, 
        rating: review_rating, 
        details: review_details
    });
    newReview.save(callback);
}

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
