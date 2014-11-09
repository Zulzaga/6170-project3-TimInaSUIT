/*
    Author: Kapaya Katongo
*/

var mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {type: String, required: true},
	about: {type: String, required: true},
	reviews: [{type: mongoose.Schema.ObjectId, ref: 'Review'}]
});

schema.statics.create = function(name, about, callback) {
    var newCompany = new Company({
        name: name,
        about: about,
        reviews: []
    });

    newCompany.save(callback);
}

var Company = mongoose.model('Company', schema);

var checkLength = function(s) {
    if (s){
        return s.length > 0;
    } else {
        return false;
    }
};

Company.schema.path('name').validate(checkLength, "Name cannot be empty");
Company.schema.path('about').validate(checkLength, "About cannot be empty");

module.exports = Company;