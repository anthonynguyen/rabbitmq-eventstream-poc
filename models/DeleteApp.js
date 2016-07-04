var mongoose = require('mongoose');

var deleteAppSchema = mongoose.Schema({
	deleted: {type: Date, required: true, default: Date.now},
	owner: {type: String, required: true},
	title: {type: String, required: true},
});
var DeleteApp = mongoose.model('DeleteApp', deleteAppSchema);

module.exports = DeleteApp;
