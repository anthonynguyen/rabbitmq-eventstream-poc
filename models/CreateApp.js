var mongoose = require('mongoose');

var createAppEventSchema = mongoose.Schema({
	createdAt: {type: Date, required: true, default: Date.now},
	createdBy: {type: String, required: true},
	title: {type: String, required: true},
});
var CreateAppEvent = mongoose.model('CreateAppEvent', createAppEventSchema);

module.exports = CreateAppEvent;
