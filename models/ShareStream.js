var mongoose = require('mongoose');

var shareStreamEventSchema = mongoose.Schema({
	sharedAt: {type: Date, required: true, default: Date.now},
	sharedBy: {type: String, required: true},
	sharedTo: {type: String, required: true},
});
var ShareStreamEvent = mongoose.model('ShareStreamEvent', shareStreamEventSchema);

module.exports = ShareStreamEvent;
