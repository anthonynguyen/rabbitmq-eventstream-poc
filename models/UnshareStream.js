var mongoose = require('mongoose');

var unshareStreamEventSchema = mongoose.Schema({
	unsharedAt: {type: Date, required: true, default: Date.now},
	unsharedBy: {type: String, required: true},
	unsharedFrom: {type: String, required: true},
});
var UnshareStreamEvent = mongoose.model('UnshareStreamEvent', unshareStreamEventSchema);

module.exports = UnshareStreamEvent;
