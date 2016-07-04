var mongoose = require('mongoose');

var createUserEventSchema = mongoose.Schema({
	createdAt: {type: Date, required: true, default: Date.now},
	firstName: {type: String, required: true},
	lastName: {type: String},
	username: {type: String, required: true},
	email: {type: String, required: true},
	type: {type: String, required: true, enum: ['FREE', 'PREMIUM', 'EMPLOYEE']},
	country: {type: String, required: true},
});
var CreateUserEvent = mongoose.model('CreateUserEvent', createUserEventSchema);

module.exports = CreateUserEvent;
