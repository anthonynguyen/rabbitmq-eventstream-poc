var mongoose = require('mongoose');

var shareStreamSchema = mongoose.Schema({
	sharedAt: {type: Date, required: true, default: Date.now},
	sharedBy: {type: String, required: true},
	sharedTo: {type: String, required: true},
});
var ShareStream = mongoose.model('ShareStream', shareStreamSchema);

module.exports = ShareStream;
