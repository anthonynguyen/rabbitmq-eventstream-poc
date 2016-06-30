var mongoose = require('mongoose');

var newUserSchema = mongoose.Schema({
	created: {type: Date, required: true, default: Date.now},
	firstName: {type: String, required: true},
	lastName: {type: String},
	username: {type: String, required: true},
	email: {type: String, required: true},
	type: {type: String, required: true, enum: ['FREE', 'PREMIUM', 'EMPLOYEE']},
	country: {type: String, required: true},
});
var NewUser = mongoose.model('NewUser', newUserSchema);

module.exports = NewUser;
