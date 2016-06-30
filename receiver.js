var amqp = require('amqp');
var mongoose = require('mongoose');

var LOG = require('./log.js');
var config = require('./config.js');

var MONGO_ADDRESS = 'mongodb://' + config.MONGO_HOST + ':' + config.MONGO_PORT + '/' + config.MONGO_DB;
mongoose.connect(MONGO_ADDRESS);
mongoose.connection.on('open', function() {
	LOG.success('Connected to Mongo database at', MONGO_ADDRESS);
});

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

var newAppSchema = mongoose.Schema({
	created: {type: Date, required: true, default: Date.now},
	owner: {type: String, required: true},
	title: {type: String, required: true},
});
var NewApp = mongoose.model('NewApp', newAppSchema);

function eventHandler(message, headers, deliveryInfo, messageObject) {
	var EVENTS = {
		NewUserEvent: NewUser,
		NewAppEvent: NewApp,
	};

	if (EVENTS.hasOwnProperty(message.type)) {
		var type = message.type;
		var model = EVENTS[type];
		LOG.warn('Received', type);

		var event = new model(message.event);
		event.save(function(err) {
			if (err != null) {
				LOG.error('Not saved:', err.message);
			} else {
				LOG.success('Saved');
			}
		});
	} else {
		LOG.warn('Message received with unknown type:', message.type);
	}
}

var connection = amqp.createConnection({host: config.RABBITMQ_HOST, port: config.RABBITMQ_PORT});
connection.on('error', function(err) {
  LOG.error('RabbitMQ error:', err.message);
});

connection.on('ready', function() {
	LOG.success('Connected to RabbitMQ at ' + config.RABBITMQ_HOST + ':' + config.RABBITMQ_PORT);
	var q = connection.queue('', function(queue) {
		LOG.success('RabbitMQ queue created');
		queue.bind(config.RABBITMQ_EXCHANGE, '', function() {
			LOG.success('RabbitMQ queue bound to', config.RABBITMQ_EXCHANGE);
			queue.subscribe(eventHandler);
		});
	});
});
