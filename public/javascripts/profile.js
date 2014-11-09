/*
    Author: Zulsar Batmunkh
*/

// On user submitting his/her login info, loads home page if 
// there's a matching user, otherwise loads the login page with
// appropriate error message. Upon failure of the AJAX request, 
// alerts and loads the home page again.
$(document).on('submit', '#signin_form', function(evt) {
  evt.preventDefault();
  $.post(
    '/users/login',
    helpers.getFormData(this)
  ).done(function(response) { 
    if (response.error) {
        loadPage('login', {error: response.error});
    } else {
        currentUser = response.user;
        loadHomePage();
    }
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadHomePage();
  });
});

// On user registring a new account, loads login page with
// appropriate message either error or instruction. Upon failure of the AJAX request, 
// alerts and loads the home page again.
$(document).on('submit', '#registration_form', function(evt) {
  evt.preventDefault();
  $.post(
    '/users',
    helpers.getFormData(this)
      ).done(function(response) {
      if (response.error) {
        loadPage('login', {error: response.error});
      } else {
        loadPage('login', {alert: response});
      }
    }).fail(function(jqxhr) {
      alert('An unknown error occurred.');
      loadHomePage();
    });
});

// Upon the user clicking logout, logs the user out.
$(document).on('click', '#logout', function(evt) {
  evt.preventDefault();
  $.get(
    '/users/logout'
  ).done(function(response) {
    currentUser = undefined;
    loadHomePage();
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadHomePage();
  });
});

// Upon user clicking other user's username, 
// loads his/her profile.
$(document).on('click', '.profile', function(evt) {
  var item = $(this).parent();
  var userId = item.data('user-id');
  var username = item.find('a').text();
   $.ajax({
    url: '/users/' + userId + '/reviews/',
    type: 'GET'
  }).done(function(response) {
    loadOtherUserProfilePage({reviews: response.message, user: username});
  }).fail(function(jqxhr) {
    alert('An unknown error occurred.');
    loadHomePage();
  });
});
