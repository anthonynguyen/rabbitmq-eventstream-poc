var mongoose = require('mongoose');

var unshareStreamSchema = mongoose.Schema({
	unsharedAt: {type: Date, required: true, default: Date.now},
	unsharedBy: {type: String, required: true},
	unsharedFrom: {type: String, required: true},
});
var UnshareStream = mongoose.model('UnshareStream', unshareStreamSchema);

module.exports = UnshareStream;
