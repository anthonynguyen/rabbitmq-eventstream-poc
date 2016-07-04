var mongoose = require('mongoose');

var deleteAppEventSchema = mongoose.Schema({
	deletedAt: {type: Date, required: true, default: Date.now},
	deletedBy: {type: String, required: true},
	title: {type: String, required: true},
});
var DeleteAppEvent = mongoose.model('DeleteAppEvent', deleteAppEventSchema);

module.exports = DeleteAppEvent;
