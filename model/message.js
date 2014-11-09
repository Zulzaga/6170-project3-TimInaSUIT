/*
    Author: Zulsar Batmunkh
*/

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var messageSchema = mongoose.Schema({
    from: { type: ObjectId, ref: 'User' },
    to: { type: ObjectId, ref: 'User' },
    content: String
});

messageSchema.statics.create = function(from, to, content, callback) {
    var newMessage = new Message({
        'from': from,
        'to': to,
        'content': content
    });

    newMessage.save(callback);
}

var Message = mongoose.model('Message', messageSchema);

var checkLength = function(s) {
	return s.length > 0;
};

module.exports = Message;

