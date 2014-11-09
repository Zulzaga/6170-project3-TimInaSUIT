/*
	Author: Yee Ling Gan
*/
asyncTest("Testing succesful login", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/login",
		type: "POST",
		dataType: "json",
		data: { username: "Zulaa", password: "11" },
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.message === "Succesfully logged in!", "Testing successful login");
			start();
		}
	});
});

var newPostID;
var originalLength;

asyncTest("Testing GET reviews", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews', 
		dataType: 'json',  
		type: 'GET',
		xhrFields: { withCredentials: true },
		success: function(data){
			ok(data.success, "Testing: getting reviews");
			start();
		}
	});
});

asyncTest("Testing POSTing new review", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews', 
		dataType: 'json', 
		type: 'POST', 
		data: {company: 'Facebook', rating: 3, details: 'Started by Mark Zuckerberg'}, 
		xhrFields: {withCredentials: true}, 
		success: function(data){
			ok(data.success, "Testing Posting new review: successful");
			newPostID = data.message._id;
			ok(data.message.user==="Zulaa", "Testing New Review: correct user name");
			ok(data.message.company==="Facebook", "Testing New Review: correct company name");
			ok(data.message.rating === 3, "Testing New Review: correct rating");
			ok(data.message.details === "Started by Mark Zuckerberg", "Testing New Review: correct details");
			start();
		}
	});
});

asyncTest("Testing GET a particular review by ID", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews', 
		dataType: 'json',  
		type: 'GET',
		xhrFields: { withCredentials: true },
		success: function(data2){
			originalLength = data2.message.length;
			newPostID = data2.message[originalLength-1]._id; 
			ok(data2.success, "Testing: got a list of reviews");
			$.ajax({
				url: 'http://tim-kkatongo.rhcloud.com/reviews/' + newPostID, 
				dataType: 'json',  
				type: 'GET',
				xhrFields: { withCredentials: true },
				success: function(data){
					ok(data.success, "Testing: obtained the review that was just posted");
					ok(data.message.user==="Zulaa", "Testing Review: correct user name");
					ok(data.message.company==="Facebook", "Testing Review: correct company name");
					ok(data.message.rating === 3, "Testing Review: correct rating");
					ok(data.message.details === "Started by Mark Zuckerberg", "Testing Review: correct details");
					start();
				}
			});
		}
	});
});

asyncTest("Testing that a user cannot have more than one review for each company", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews', 
		dataType: 'json', 
		type: 'POST', 
		data: {company: 'Facebook', rating: 3, details: 'testing'}, 
		xhrFields: {withCredentials: true}, 
		success: function(data){
			ok(!data.success, "Testing not allowed to enter more than one review per user per company");
			ok(data.error === "User already has a review for this company!", "Testing New Review: correct details");
			start();
		}
	});
});

asyncTest("Testing PUT: editing a previous review", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews/' + newPostID, 
		dataType: 'json',  
		type: 'PUT',
		xhrFields: { withCredentials: true },
		data: {rating: 5, details: 'changed my mind'},
		success: function(data){
			equal(data.success, true);
			ok(data.success, "Testing: obtained the review that was just edited");
			ok(data.message.user==="Zulaa", "Testing Edited Review: correct user name");
			ok(data.message.company==="Facebook", "Testing Edited Review: correct company name");
			ok(data.message.rating === 5, "Testing Edited Review: correct new rating");
			ok(data.message.details === "changed my mind", "Testing Edited Review: correct new details");
			start();
		}
	});
});

asyncTest("Testing DELETEing a review", function() {
	$.ajax({
		url: 'http://tim-kkatongo.rhcloud.com/reviews/'+ newPostID, 
		dataType: 'json', 
		type: 'DELETE', 
		xhrFields: {withCredentials: true}, 
		success: function(data){
			ok(data.success, "Testing: successfully deleted a post");
			ok(data.message === newPostID, "Testing: deleted post has the correct ID");
			start();
		}
	});
});

asyncTest("Testing logout", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/logout",
		type: "GET",
		dataType: "json",
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.message === "Succesfully logged out!", "Testing logout");
			start();
		}
	});
});

