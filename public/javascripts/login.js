/*
    Author: Zulsar Batmunkh
*/

currentUser = undefined;

// On loading the page, set the currentUser if there's a user already logged in
// and load the home page.
$(document).ready(function() {
  $.get('/users/current', function(response) {
    if (response.user) {
      currentUser = response.user;
    }
    loadHomePage();
  });
});

// On clicking the Profile selection in the navbar, loads the user profile page
// with user's messages.
$(document).on('click', '#profile_page', function() {
    $.get('/messages', function(res) {
      if (res) {
        loadProfilePage({messages: res.message});
      }
    });
});

// On clicking Companies selection in the navbar, loads companies page.
$(document).on('click', '#companies_page', function() {
    $.get('/companies', function(res) {
      if (res) {
        loadCompaniesPage(res);
      }
    });
});

// On clicking MyMessages link in the user profile, loads user's messages in the profile.
$(document).on('click', '#myMessages', function() {
    loadProfilePage();
});

// On clicking MyReviews link in the user profile, loads user's reviews in the profile.
$(document).on('click', '#myReviews', function() {
    loadProfilePageWithReviews();
});

// Loads page with the given template and data.
var loadPage = function(template, data) {
  data = data || {};
  $('#main-container').html(Handlebars.templates[template](data));
};

// Loading home page. If there's a user logged in, loads profile page,
// otherwise loads login page.
var loadHomePage = function() {
  if (currentUser) {
    loadProfilePage();
  } else {
    loadPage('login');
  }
};

// Loading profile page with given additional data and user's messages.
// user messages are loaded as a default and will be displayed whenever user enters his/her
// profile page.
var loadProfilePage = function(additional) {
  $.get('/messages', function(res) {
    if (res) {
      loadPage(
        'profile',
        $.extend(
          {currentUser: currentUser},
          {messagesSent: res.message.sent},
          {messagesReceived: res.message.received},
          additional
        )
      );
    }
  });
};

// Loading profile page with reviews and additional data, so that
// the Profile Page will be displayed with user's reviews.
var loadProfilePageWithReviews = function(additional) {
  $.get('/users/' + currentUser._id + '/reviews', function(res) {
      if (res) {
        loadProfilePage({reviews: res.message, displayReviews: true});
      }
  });
};

// Loading other user profile with the given additional data.
var loadOtherUserProfilePage = function(additional) {
    loadPage(
      'otherUser',
      $.extend(
        additional
      )
    );
};

// Loads Companies page with the given data.
var loadCompaniesPage = function(data){
	if (data){
		loadPage('companies', data);
	}
}