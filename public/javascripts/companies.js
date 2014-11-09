/*

Author: Kapaya Katongo

*/


/*

Listens for click  events on companies button and
then submits AJAX call to retrieve all companies from 
the database.

*/

$(document).on('click', '#companies_page', function(event) {
	event.preventDefault();
    $.get('/companies', function(res) {
	    if (res) {
	    	loadCompaniesPage(res);
	    }
  	});
});

