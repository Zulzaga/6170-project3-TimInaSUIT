/*

Author: Kapaya Katongo

*/

/*

Searches for company name entered into search box
by looping through company divs using regex
to match them.

*/

function searchForCompany() {
	var notFound = true;

	$('.a-company').each(function(){
		var company = $("#company-search").val();
		var company_in_list = $(this).attr('id');
		var regEx = new RegExp(company, "i");
		var match = company_in_list.match(regEx);
		if (match && (match[0].length > (company_in_list.length * 0.6))){
			$('html, body').animate({
    			scrollTop: $("#"+company_in_list).offset().top - 100
 			}, 500);
 			notFound = false;
			return false;
		}
	});	

	if (notFound){
		alert("The company you're looking for is not in our database. Please make sure that you have correctly spelled the name.");
	}
};