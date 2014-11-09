/*
    Author: Zulsar Batmunkh
*/

// On clicking delete button of a message, deletes the user's message and
// loads back to profile page.
$(document).on('click', '.delete-message', function(evt) {
  var item = $(this).parent();
  var id = item.data('message-id');
  $.ajax({
    url: '/messages/' + id,
    type: 'DELETE'
  }).done(function(response) {
    item.remove();
    loadProfilePage();
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadProfilePage();
  });
});

// On clicking post button in the message box in othe user's profile,
// creates a new message and on successful creation of the message, loads 
// user's profile.
$(document).on('submit', '#new_message_form', function(evt) {
  var data = helpers.getFormData(this);
  evt.preventDefault();
  $.post(
    '/messages',
    data
  ).done(function(response) { 
    loadProfilePage();
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadProfilePage();
  });
});