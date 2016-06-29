var amqp = require('amqp');
var LOG = require('./log.js');

var config = require('./config.js');

var connection = amqp.createConnection({host: config.HOST, port: config.PORT});
connection.on('error', function(e) {
  LOG.error(e);
});

connection.on('ready', function() {
	LOG.success('Connected to rabbitmq at ' + config.HOST + ':' + config.PORT);
	var q = connection.queue('', function(queue) {
		LOG.success('Queue created');
		queue.bind(config.EXCHANGE, '', function() {
			LOG.success('Queue bound to', config.EXCHANGE);
			queue.subscribe(function(message, headers, deliveryInfo, messageObject) {
				LOG.success('Received', JSON.stringify(message));
			});
		});
	});
});
