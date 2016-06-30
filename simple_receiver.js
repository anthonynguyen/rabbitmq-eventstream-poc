var amqp = require('amqp');

var LOG = require('./log.js');
var config = require('./config.js');

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
			queue.subscribe(function(message, headers, deliveryInfo, messageObject) {
				LOG.success('Received', JSON.stringify(message));
			});
		});
	});
});
