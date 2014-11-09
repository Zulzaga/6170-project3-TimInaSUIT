/*
    Author: Zulsar Batmunkh
*/

asyncTest("Testing logging in with wrong credentials", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/login",
		type: "POST",
		dataType: "json",
		data: { username: "Zulaa", password: "13" },
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.error === "Wrong username and password combination!", "Testing login");
			start();
		}
	});
});

asyncTest("Testing logging out with wrong credentials", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/logout",
		type: "GET",
		dataType: "json",
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.error === "No logged in user!", "Testing login");
			start();
		}
	});
});

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

asyncTest("Testing getting user reviews", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/5447103e44a02700002e27c4/reviews",
		type: "GET",
		dataType: "json",
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.message !== undefined, "Testing getting user reviews");
			start();
		}
	});
});

asyncTest("Testing getting user review by review id", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/54446f225db0bd9721eeda11/reviews/544722987eca0f0000250327",
		type: "GET",
		dataType: "json",
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.message.user === "Katongo", "Testing getting user review by id");
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
