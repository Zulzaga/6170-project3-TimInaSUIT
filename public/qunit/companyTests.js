/*
	Author: Kapaya Katongo
*/

asyncTest("Testing succesful login", function() {
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/users/login",
		type: "POST",
		dataType: "json",
		data: { username: "Katongo", password: "1234" },
		xhrFields: { withCredentials: true },
		success : function(data) {
			ok(data.message === "Succesfully logged in!", "Testing successful login");
			start();
		}
	});
});

var companyToDelete;
var companyID_get

asyncTest("Testing GET all companies before creating a new company", function(assert){
 	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/companies/",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			if (data.success){
				ok(data.message[0].name === "Facebook", "[GET all companies] Company name matches!");
				ok(data.message[0].about === "Started by Mark Zuckerberg", '[GET all companies] Company about matches!');
				companyID_get = data.message[0]._id;
				start();
			}
		}
	});
});

asyncTest("Testing GETting a company by ID", function(assert){
 	$.ajax({
		//url: "http://tim-kkatongo.rhcloud.com/companies/544597ebd1ae5cb03a1a6fbc",
		url: "http://tim-kkatongo.rhcloud.com/companies/" + companyID_get,
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			if (data.success){
				ok(data.message.name === "Facebook", "Company name matches!");
				ok(data.message.about === "Started by Mark Zuckerberg", 'Company about matches!');
				start();
			}
		}
	});
});

asyncTest("Testing POSTing a new company", function(assert){
	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/companies",
		dataType: "json",
		type: "POST",
		xhrFields: {withCredentials: true},
		data: {name: "Dropbox", about: "Started by Drew Houston"},
		success : function(data) {
			if (data.success){
				ok(data.message.name === 'Dropbox', 'Created correct name!');
				ok(data.message.about === 'Started by Drew Houston', 'Created correct about!');
				companyToDelete = data.message._id;
				start();
			} 
		}
	});
});

asyncTest("Testing GET all companies", function(assert){
 	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/companies/",
		type: "GET",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			if (data.success){
				ok(data.message[0].name === "Facebook", "[GET all companies] Company name matches!");
				ok(data.message[0].about === "Started by Mark Zuckerberg", '[GET all companies] Company about matches!');
				ok(data.message[1].name === "Dropbox", "[GET all companies] Company name matches!");
				ok(data.message[1].about === "Started by Drew Houston", '[GET all companies] Company about matches!');
				start();
			}
		}
	});
});

asyncTest("Testing DELETE companies", function(assert){
 	$.ajax({
		url: "http://tim-kkatongo.rhcloud.com/companies/" + companyToDelete,
		type: "DELETE",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			if (data.success){
				ok(data.message === "Successfully deleted company!", "Company deleted!");
				start();
			}
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
