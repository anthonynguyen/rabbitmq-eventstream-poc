var amqp = require('amqp');
var LOG = require('./log.js');
var readline = require('readline');

var config = require('./config.js');

var rl = readline.createInterface(process.stdin, process.stdout);

var connection = amqp.createConnection({host: config.HOST, port: config.PORT});
connection.on('error', function(e) {
  LOG.error(e);
});

connection.on('ready', function() {
	LOG.success('Connected to rabbitmq at ' + config.HOST + ':' + config.PORT);
	connection.exchange(config.EXCHANGE, {type: 'fanout'}, function(exchange) {
		LOG.success('Opened', config.EXCHANGE, 'exchange');
		rl.setPrompt('Message: ');
		rl.prompt();
		rl.on('line', function(line) {
			var data = {message: line.trim()};
			exchange.publish('', data);
			LOG.success('Sent', JSON.stringify(data));
			rl.prompt();
		}).on('close', function() {
			connection.disconnect();
		})
	});
});
