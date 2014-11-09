(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['companies'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "            <div class='a-company' id="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " data-company-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n                <h5> <a name="
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " href=\"#\" class=\"selected-company\"> "
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</a></h5>\n                <hr>\n                <p> "
    + escapeExpression(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"about","hash":{},"data":data}) : helper)))
    + " <p>\n                <br>\n            </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!--\n\nAuthor: Kapaya Katongo\n\n-->\n\n\n<!--fixed navigation bar -->\n<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n    <div class='container'>\n      <div class=\"navbar-header\">\n        <a class=\"navbar-brand\" href=\"/\">Welcome to TIM in a Suit!</a>\n      </div>\n          <div class=\"collapse navbar-collapse\" id=\"example-navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-right\">\n              <li><a href=\"#\" id=\"profile_page\">Profile</a></li>\n              <li class=\"active\"><a href=\"#\" id=\"companies_page\">Companies</a></li>\n              <li><a href=\"#\" id=\"logout\">Logout</a></li>\n            </ul>\n            <ul class=\"nav navbar-nav navbar-right\">\n              <li>\n                  <form class=\"navbar-form\" role=\"search\" onsubmit='searchForCompany(); return false;'>\n                    <div class=\"input-group\">\n                      <input type=\"text\" class=\"form-control\" placeholder=\"Navigate To Company\" id=\"company-search\">\n                      <div class=\"input-group-btn\">\n                        <button class=\"btn btn-default\" type=\"submit\"><i class=\"glyphicon glyphicon-search\"></i></button>\n                      </div>\n                    </div>\n                  </form>\n              </li>\n            </ul>\n          </div>\n    </div>\n</div>\n\n<!--to fill with companies-->\n<div class=\"container\">\n    <div class = \"row companies\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.message : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n</div>\n";
},"useData":true});
templates['login'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <div id=\"errorLogin\" class='alert alert-danger' role='alert'>\n      "
    + escapeExpression(((helper = (helper = helpers.error || (depth0 != null ? depth0.error : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"error","hash":{},"data":data}) : helper)))
    + "\n    </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <div id=\"activation\" class='alert alert-success' role='alert'>\n      "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.alert : depth0)) != null ? stack1.message : stack1), depth0))
    + "\n    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<!-- \n    Author: Zulsar Batmunkh\n    Author: Yee Ling Gan\n                             -->\n\n\n<!-- Big title here in one row -->\n<div class = \"row\" id = \"main_title\">\n  <div class=\"col-sm-3\"></div>\n  <div class=\"col-sm-8 centered\">\n    <h1>WELCOME TO TIM IN A SUIT</h1>\n  </div>\n</div>\n\n<!-- left hand side: blurb; right hand side: login + registration -->\n<div class = \"row\" class = \"main\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.alert : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <div class=\"col-sm-1\"></div>\n  <!--side panels-->\n  <div class=\"col-sm-5\"> \n    <div id=\"timLogo\">\n      <img src=\"image/tim.png\" alt=\"Tim\">\n    </div>\n    <div id=\"decription\">\n       <p>TIM in a Suit is a website that aims to help MIT students share their interviewing and interning experiences. It's by MIT students for MIT students.</p>\n    </div>\n  </div>\n\n  <!--main view-->\n  <!-- cite: http://getbootstrap.com/examples/signin/ -->\n  <div class=\"col-sm-1\"></div>\n  <div class=\"col-sm-4\"> \n    <div id = \"user_forms\">\n      <div id =\"login_form\">\n        <!-- login forms here -->\n        <!-- TODO: add action for both forms!!! what is the exact url -->\n        <form id=\"signin_form\">  \n          <h3 class =\"form-signin-heading\">Please sign in</h3>\n          <input type=\"text\" name=\"username\" placeholder=\"Username\" class=\"form-control\" required >\n          <input type=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" required >\n          <input type=\"submit\" value=\"Login\" class=\"btn btn-lg btn-primary btn-block\">\n        </form>\n      </div>\n        <!-- registration forms here -->\n        \n        <form id=\"registration_form\">\n          <h3 class =\"form-signin-heading\">Registration</h3>\n          <input type=\"text\" name=\"username\" placeholder=\"Username\" class=\"form-control\" required > \n          <input type=\"password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" required >\n          <input type=\"email\" name=\"email\" placeholder=\"MIT email address\" class=\"form-control\" required >\n          <input type=\"submit\" value=\"Register\" class=\"btn btn-lg btn-primary btn-block\">\n        </form>\n    </div>\n  </div>\n</div>";
},"useData":true});
templates['otherUser'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "              <div class=\"panel panel-default\">\n              <div class=\"panel panel-heading\" data-company-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                <h5> <a name="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + " href=\"#\" class=\"selected-company\"> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></h5> \n              </div>\n              <div class=\"panel-body\">\n                <div class='review' data-review-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n                    <div>Details: "
    + escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"details","hash":{},"data":data}) : helper)))
    + " </div>\n                    <div id=\"messageContent\">Rating: "
    + escapeExpression(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rating","hash":{},"data":data}) : helper)))
    + " </div></br>\n                    </br>\n                </div>\n              </div>\n              </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- \n    Author: Zulsar Batmunkh\n    Author: Yee Ling Gan\n -->\n\n<!--fixed navigation bar -->\n<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"/\">Welcome to TIM in a Suit!</a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\" id=\"profile_page\">Profile</a></li>\n        <li><a href=\"#\" id=\"companies_page\">Companies</a></li>\n        <li><a href=\"#\" id=\"search_bar\">Search Bar</a></li>\n        <li><a href=\"#\" id=\"logout\">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class = \"row\" class = \"main\">\n  <!--side panels-->\n  <div class=\"col-sm-4\"> \n      <h3>"
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "</h3></br></br>\n      <form id=\"new_message_form\">  \n          <h5 class =\"form-signin-heading\">Send Message</h5>\n          <input type=\"hidden\" name=\"to\" value="
    + escapeExpression(((helper = (helper = helpers.user || (depth0 != null ? depth0.user : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"user","hash":{},"data":data}) : helper)))
    + "></input>\n          <textarea rows=\"10\" name=\"content\" id=\"new_message\" required></textarea>\n          <input type=\"submit\" value=\"Send\" class=\"btn btn-lg btn-primary btn-block\">\n      </form>\n  </div>\n\n  <!--main view-->\n    <div class=\"col-sm-8\"> \n      <div class=\"container\" id=\"reviewContainer\">\n          <h3>Reviews</h3>\n          <div class = \"row\" class=\"myReviews\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.reviews : depth0), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "         </div>\n    </div>\n  </div>\n</div>\n\n";
},"useData":true});
templates['profile'] = template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <div class=\"container\" id=\"reviewContainer\">\n          <h3>My Reviews</h3>\n          <div class = \"row\" class=\"myReviews\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.reviews : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "          </div>\n      </div>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <div class=\"panel panel-default\">\n                <div class=\"panel panel-heading\" data-company-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                  <h5> <a name="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + " href=\"#\" class=\"selected-company\"> "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></h5> \n                </div>\n                <div class=\"panel-body\">\n                  <div class='review' data-review-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " data-company-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.company : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                      <div>Details: "
    + escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"details","hash":{},"data":data}) : helper)))
    + " </div>\n                      <div id=\"messageContent\">Rating: "
    + escapeExpression(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rating","hash":{},"data":data}) : helper)))
    + " </div></br>\n                      <a href= \"#\" class=\"edit-myReview btn btn-primary\">Edit</a>\n                      <a href = \"#\" class=\"delete-myReview btn btn-primary\">Delete</a>\n                      </br>\n                  </div>\n                </div>\n                </div>\n";
},"4":function(depth0,helpers,partials,data) {
  var stack1, buffer = "        <h3>Received Messages</h3>\n        <div class=\"container\" id=\"messageContainer\">\n          <div class = \"row\" class=\"myRecMessages\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.messagesReceived : depth0), {"name":"each","hash":{},"fn":this.program(5, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "          </div>\n        </div>\n          <h3>Sent Messages</h3>\n          <div class=\"container\" id=\"messageContainer\">\n            <div class = \"row\" class=\"mySentMessages\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.messagesSent : depth0), {"name":"each","hash":{},"fn":this.program(7, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "            </div>\n          </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "              <div class=\"panel panel-default\">\n                <div class=\"panel-heading\" data-user-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.from : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                    From: <a href = \"#\" class=\"profile\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.from : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a>\n                </div>\n                <div class=\"panel-body\">\n                  <div class='message' data-message-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n                      <div id=\"messageContent\" style=\"border-width:1px\">"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</div></br> \n                      <a href = \"#\" class=\"delete-message btn btn-primary\">Delete</a>\n                  </div>\n                </div>\n              </div>\n";
},"7":function(depth0,helpers,partials,data) {
  var stack1, helper, lambda=this.lambda, escapeExpression=this.escapeExpression, functionType="function", helperMissing=helpers.helperMissing;
  return "                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\" data-user-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.to : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n                      To: <a href = \"#\" class=\"profile\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.to : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a>\n                  </div>\n                  <div class=\"panel-body\">\n                    <div class='message' data-message-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + ">\n                        <div id=\"messageContent\" style=\"border-width:1px\">"
    + escapeExpression(((helper = (helper = helpers.content || (depth0 != null ? depth0.content : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"content","hash":{},"data":data}) : helper)))
    + "</div></br> \n                        <a href = \"#\" class=\"delete-message btn btn-primary\">Delete</a>\n                    </div>\n                  </div>\n                </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<!-- \n    Author: Zulsar Batmunkh\n    Author: Yee Ling Gan\n -->\n\n<!--fixed navigation bar -->\n<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"/\">Welcome to TIM in a Suit!</a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li class=\"active\"><a href=\"#\" id=\"profile_page\">Profile</a></li>\n        <li><a href=\"#\" id=\"companies_page\">Companies</a></li>\n        <li><a href=\"#\" id=\"logout\">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class = \"row\" class = \"main\">\n  <!--side panels-->\n  <div class=\"col-sm-4\"> \n    <div id = \"personal_profile\"> \n        <h3>Welcome "
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.currentUser : depth0)) != null ? stack1.username : stack1), depth0))
    + " :)</h3></div></br>\n    <div>\n      <a href=\"#\" id=\"myMessages\"><h4>My Messages</h4></a>\n    </div>\n    <div>\n      <a href=\"#\" id=\"myReviews\"><h4>My Reviews</h4></a>\n    </div>\n    <div id='beaver'>\n        <img id=\"timLogoProf\" src=\"image/tim.png\" alt=\"Tim\">\n    </div>\n  </div>\n\n  <!--main view-->\n    <div class=\"col-sm-8\"> \n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.displayReviews : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(4, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n  </div>\n</div>\n\n";
},"useData":true});
templates['singleCompany'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <div id=\"error\" class='alert alert-danger' role='alert'>\n        "
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "\n      </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "      <div id=\"successfullyChanged\" class='alert alert-success' role='alert'>\n        "
    + escapeExpression(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"message","hash":{},"data":data}) : helper)))
    + "\n      </div>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "         <form id=\"new_review_form\" data-company-id="
    + escapeExpression(((helper = (helper = helpers.companyId || (depth0 != null ? depth0.companyId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companyId","hash":{},"data":data}) : helper)))
    + " data-review-id="
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.writtenreview : depth0)) != null ? stack1.message : stack1)) != null ? stack1._id : stack1), depth0))
    + " data-spy=\"affix\" data-offset-top=\"0\">\n          <h3 class =\"form-review-heading\">Edit Your Review</h3>\n          <textarea rows=\"4\" name=\"details\" id=\"new-review-details\" required>"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.writtenreview : depth0)) != null ? stack1.message : stack1)) != null ? stack1.details : stack1), depth0))
    + "</textarea>\n          <input type=\"text\" name=\"rating\" id=\"new-review-rating\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.writtenreview : depth0)) != null ? stack1.message : stack1)) != null ? stack1.rating : stack1), depth0))
    + "\" class=\"form-control\" required >\n          <input type=\"submit\" value=\"Edit Post\" class=\"btn btn-lg btn-primary btn-block\" id=\"review-btn\">\n        </form>\n\n      <!-- If the user does not have a review for this company, show the 'new review' box -->\n";
},"7":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "        <form id=\"new_review_form\" data-company-name= "
    + escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"company","hash":{},"data":data}) : helper)))
    + " data-company-id="
    + escapeExpression(((helper = (helper = helpers.companyId || (depth0 != null ? depth0.companyId : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companyId","hash":{},"data":data}) : helper)))
    + " >  \n          <h3 class =\"form-review-heading\">Post a Review</h3>\n          <textarea rows=\"4\" name=\"details\" id=\"new-review-details\" placeholder=\"What do you think about "
    + escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"company","hash":{},"data":data}) : helper)))
    + "? What was helpful for you in your preparation?\" required></textarea>\n          <input type=\"text\" name=\"rating\" id=\"new-review-rating\" placeholder=\"Give a rating between 0 and 5\" class=\"form-control\" required >\n          <input type=\"submit\" value=\"Post\" class=\"btn btn-lg btn-primary btn-block\" id=\"review-btn\">\n        </form>\n";
},"9":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "        <!-- If it's the currentUser's review, show in green and show the edit and delete buttons -->\n";
  stack1 = ((helpers.if_equals || (depth0 && depth0.if_equals) || helperMissing).call(depth0, (depths[1] != null ? depths[1].currentUser : depths[1]), ((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), {"name":"if_equals","hash":{},"fn":this.program(10, data, depths),"inverse":this.program(12, data, depths),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"10":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "          <div class=\"review panel panel-success\" data-review-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " data-company-id="
    + escapeExpression(lambda((depths[2] != null ? depths[2].companyId : depths[2]), depth0))
    + ">\n            <div class=\"panel-heading\" data-user-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n              <h5>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</h5>\n            </div>\n            <div class=\"panel-body\">\n              <p>Rating: "
    + escapeExpression(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rating","hash":{},"data":data}) : helper)))
    + "</p>\n              <p>Thoughts: "
    + escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"details","hash":{},"data":data}) : helper)))
    + "</p>\n              <a href=\"#\" class=\"edit-review btn btn-primary btn-sm inline\">Edit</a>\n              <a href=\"#\" class=\"delete-review btn btn-primary btn-sm inline\">Delete</a>\n            </div>\n          </div>\n        <!-- other users' review, show in blue, do not show edit or delete button -->\n";
},"12":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "          <div class=\"review panel panel-info\" data-review-id="
    + escapeExpression(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"_id","hash":{},"data":data}) : helper)))
    + " data-company-id="
    + escapeExpression(lambda((depths[2] != null ? depths[2].companyId : depths[2]), depth0))
    + " >\n            <div class=\"panel-heading\" data-user-id="
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1._id : stack1), depth0))
    + ">\n              <a href=\"#\" class=\"profile\" >"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.username : stack1), depth0))
    + "</a>\n            </div>\n            <div class=\"panel-body\">\n              <p>Rating: "
    + escapeExpression(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"rating","hash":{},"data":data}) : helper)))
    + "</p>\n              <p>Thoughts: "
    + escapeExpression(((helper = (helper = helpers.details || (depth0 != null ? depth0.details : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"details","hash":{},"data":data}) : helper)))
    + "</p>\n            </div>\n          </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<!-- \nauthor: Yee Ling Gan \nCite: Navigation bar uses bootstrap: http://getbootstrap.com/ \n-->\n\n<!--fixed navigation bar -->\n<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"/\">Welcome to TIM in a Suit!</a>\n    </div>\n    <div class=\"navbar-collapse collapse\">\n      <ul class=\"nav navbar-nav navbar-right\">\n        <li><a href=\"#\" id=\"profile_page\">Profile</a></li>\n        <li><a href=\"#\" id=\"companies_page\">Companies</a></li>\n        <li><a href=\"#\" id=\"logout\">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n<div class = \"row\" class = \"main\" >\n  <!--side panels-->\n  <!-- <div class=\"col-sm-4 right-line\">  -->\n  <div class=\"col-sm-4 left-nav\">\n    <div id = \"company_profile\" data-spy=\"affix\" data-offset-top=\"25\">\n      <!-- company name and details -->\n      <p><h1>"
    + escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"company","hash":{},"data":data}) : helper)))
    + "</h1></p>\n      <p><b>Rating:</b> "
    + escapeExpression(((helper = (helper = helpers.companyRating || (depth0 != null ? depth0.companyRating : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"companyRating","hash":{},"data":data}) : helper)))
    + " out of 5</p>\n      <p>"
    + escapeExpression(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"about","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n  </div>\n  <!--main view-->\n  <div class=\"col-sm-8\">\n    <!-- to show errors if any -->\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.error : depth0), {"name":"if","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <!-- to indicate successful postings -->\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.success : depth0), {"name":"if","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n    <div id = \"new_review\" class=\"fixed\">\n\n      <!-- If the user already has a review for this company, show the 'edit review' box -->\n";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.writtenreview : depth0)) != null ? stack1.success : stack1), {"name":"if","hash":{},"fn":this.program(5, data, depths),"inverse":this.program(7, data, depths),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    </div> \n    <hr>\n    <!-- List of all reviews for the company -->\n    <div id = \"reviews\" class=\"overflow\">\n      <h3>Reviews about "
    + escapeExpression(((helper = (helper = helpers.company || (depth0 != null ? depth0.company : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"company","hash":{},"data":data}) : helper)))
    + "</h3>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.reviews : depth0), {"name":"each","hash":{},"fn":this.program(9, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "    </div>\n  </div>\n</div>\n";
},"useData":true,"useDepths":true});
})();
