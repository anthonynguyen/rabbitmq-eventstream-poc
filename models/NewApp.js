var mongoose = require('mongoose');

var newAppSchema = mongoose.Schema({
	created: {type: Date, required: true, default: Date.now},
	owner: {type: String, required: true},
	title: {type: String, required: true},
});
var NewApp = mongoose.model('NewApp', newAppSchema);

module.exports = NewApp;
