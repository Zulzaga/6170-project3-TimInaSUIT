// author: Yee Ling Gan
// Cite: code reference: https://github.com/kongming92/6170-p3demo/tree/master/views

Handlebars.registerPartial('review', Handlebars.templates['review']);

//helper function to check if a and b are the same
Handlebars.registerHelper('if_equals', function(a, b, block) {
    if(a===b){
    	return block.fn(this);
    }
    return block.inverse(this);
});

/* 
loading a company's page based on the company_id
success_changed and messages are only used if a previous action (editing / posting / error):
	success_changed: boolean for whether the action was successful
	messages: any message to be displayed to the user
 */
var loadCompanyPage = function (company_id, success_changed, messages){
	var currentUsername;
	var success = false;
	var error = false;
	var message = messages;
	if(success_changed){
		success = true;
	}
	else if(success_changed!==undefined){
		error = true;
	}
	$.get('/users/current', function(username){
		currentUsername = username.user.username;
	});

	$.get('/companies/'+company_id, function(response){
		//find out if current user already made a review for this company
		$.get('/reviews/currentUser/'+ company_id, function(review_res){
			loadPage(
				'singleCompany', 
				$.extend(
					{}, 
					{error: error}, 
					{success: success}, 
					{message: message}, 
					{writtenreview: review_res},
					{companyId: company_id},
					{company: response.message.name}, 
					{companyRating: response.message.rating}, 
					{about: response.message.about}, 
					{reviews: response.message.reviews},
					{currentUser: currentUsername}
				)
			);
		});
	});
}; 

//On clicking on a particular company from the companies page, load the corresponding single company's page
$(document).on('click', '.selected-company', function(evt){
	evt.preventDefault();
	var company = $(this).parent().parent();
	var id = company.data('company-id');
	loadCompanyPage(id);
});

//On clicking the review button, either post a new review or update the user's current review
$(document).on('click', '#review-btn', function(evt){
	evt.preventDefault();
	var item = $(this).parent();
	var company_id = item.data('companyId');
	var ratings = $('#new-review-rating').val();
	var detail = $('#new-review-details').val();

	//posting a new review
	if($("#review-btn").val()==="Post"){
		var company_name = item.data('company-name');
		$.post('/reviews', 
			{
				company: company_name, 
				rating: ratings, 
				details: detail
			}
		).done(function(response){
			if (response.success){
				loadCompanyPage(company_id, response.success, "Review successfully posted");
			}
			else{
				loadCompanyPage(company_id, response.success, response.error);
			}
		}).fail(function(jqxhr) {
		    alert('An unknown error occurred, check your review details and please try again.');
		    loadCompanyPage(company_id);
		});
	}

	//editing a review
	else{
		var review_id = item.data('review-id');
		$.ajax({
			url: "/reviews/"+review_id, 
			type: 'PUT', 
			data: {
				rating: ratings, 
				details: detail
			}
		}).done(function(response){
			if (response.success){
				loadCompanyPage(company_id, response.success, "Review successfully edited");
			}
			else{
				loadCompanyPage(company_id, response.success, response.error);
			}
		}).fail(function(jqxhr) {
		    alert('An unknown error occurred, check your review details and please try again.');
		    loadCompanyPage(company_id);
		});
	}
});

//On clicking the delete-review button:
//		delete the review and reload the company page with a relevant success / error message
$(document).on('click', '.delete-review', function(evt){
	evt.preventDefault();
	var item = $(this).parent().parent();
	var id = item.data('review-id');
	var company_id = item.data('company-id');
	$.ajax({
		url: '/reviews/' + id, 
		type: 'DELETE'
	}).done(function (response){
		if (response.success){
				loadCompanyPage(company_id, response.success, "Review successfully deleted");
			}
			else{
				loadCompanyPage(company_id, response.success, response.error);
			}
	}).fail(function(jqxhr) {
	    alert('An unknown error occurred, please try again.');
	    loadCompanyPage(company_id);
	});
});

//On clicking the edit review button in the reviews list:
//	 auto-scroll to the 'edit post' box on the top of the page 
$(document).on('click', '.edit-review', function(evt){
	evt.preventDefault();
	var item = $(this).parent().parent();
	var id = item.data('review-id');
	$("html, body").animate({ scrollTop: 0 }, 600);
});
