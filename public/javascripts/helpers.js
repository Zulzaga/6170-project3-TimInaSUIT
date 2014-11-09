/*
    Author: Zulsar Batmunkh
    Got from the sample app: https://github.com/kongming92/6170-p3demo/
*/

// Helper method for getting input data from form.
var helpers = (function() {
  var self = {};
  self.getFormData = function(form) {
    var inputs = {};
    $(form).serializeArray().forEach(function(item) {
      inputs[item.name] = item.value;
    });
    return inputs;
  };
  return self;
})();
