/*
    Author: Zulsar Batmunkh
*/

// On the user clicking delete button of a message displayed in his/her profile page,
// deletes the message and loads the profile page again.
$(document).on('click', '.delete-myReview', function(evt) {
  var item = $(this).parent();
  var id = item.data('review-id');
  $.ajax({
    url: '/reviews/' + id,
    type: 'DELETE'
  }).done(function(response) {
    item.remove();
    loadProfilePageWithReviews();
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadProfilePageWithReviews();
  });
});

// On the user clicking delete button of a message displayed in his/her profile page,
// deletes the message and loads the given company page with the company id.
// The user will be able to edit his.her review there.
$(document).on('click', '.edit-myReview', function(evt) {
  var item = $(this).parent();
  var companyId = item.data('company-id');
  loadCompanyPage(companyId);
});
