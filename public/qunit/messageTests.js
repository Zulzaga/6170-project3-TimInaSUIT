/*
    Author: Zulsar Batmunkh
*/

var newMessageId;

asyncTest("Testing getting messages without logged in user", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.error === "No logged in user!");
			start();
		}
	});
});

asyncTest("Testing getting a message by id without logged in user", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages/54432ea75111533e1b57a83c",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.error === "No logged in user!");
			start();
		}
	});
});

asyncTest("Testing creating a message without logged in user", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages",
		type: "POST",
		dataType: "json",
		data: { to: "544320707a3be99b1a22945a", content: "Hi" },
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.error === "No logged in user!");
			start();
		}
	});
});

asyncTest("Testing deleting a message without logged in user", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages/54432ea75111533e1b57a83c",
		type: "DELETE",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.error, "No logged in user!");
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

asyncTest("Testing getting user messages", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			console.log(data);
			ok(data.message !== undefined, "Testing messages succesfully retrieved.");
			start();
		}
	});
});

asyncTest("Testing non-existent message", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages/544320577a3be99b1a229459",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.error === "No message found!", "No message found!");
			start();
		}
	});
});

asyncTest("Testing creating a new message", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages",
		type: "POST",
		dataType: "json",
		xhrFields: {withCredentials: true},
		data: { to: "Katongo", content: "Hi Katongo :)" },
		success : function( data ) {
			newMessageId = data.message._id;
			ok(data.message.content === "Hi Katongo :)", "Testing message content");
			ok(data.message.from === "Zulaa", "Testing message author");
			ok(data.message.to === "Katongo", "Testing message recipient");
			start();
		}
	});
});

asyncTest("Testing getting a message by id", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages/" + newMessageId,
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.message._id === newMessageId, "Testing message id");
			ok(data.message.content === "Hi Katongo :)", "Testing message content");
			ok(data.message.from === "Zulaa", "Testing message author");
			ok(data.message.to === "Katongo", "Testing message recipient");
			start();
		}
	});
});

asyncTest("Testing deleting a message", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/messages/" + newMessageId,
		type: "DELETE",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function( data ) {
			ok(data.message._id === newMessageId, "Testing message id");
			ok(data.message.content === "Hi Katongo :)", "Testing message content");
			ok(data.message.from === "Zulaa", "Testing message author");
			ok(data.message.to === "Katongo", "Testing message recipient");
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

