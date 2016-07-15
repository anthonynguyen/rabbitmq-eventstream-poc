var amqp = require('amqp');
var readline = require('readline');

var LOG = require('./log.js');
var config = require('./config.js');

var rl = readline.createInterface(process.stdin, process.stdout);
var rlData = '';

var connection = amqp.createConnection({host: config.RABBITMQ_HOST, port: config.RABBITMQ_PORT});
connection.on('error', function(e) {
  LOG.error(e);
});

connection.on('ready', function() {
	LOG.success('Connected to RabbitMQ at ' + config.RABBITMQ_HOST + ':' + config.RABBITMQ_PORT);
	connection.exchange(config.RABBITMQ_EXCHANGE, {type: 'fanout', autoDelete: false}, function(exchange) {
		LOG.success('Opened', config.RABBITMQ_EXCHANGE, 'exchange');
		rl.setPrompt('Message (JSON): ');
		rl.prompt();
		rl.on('line', function(line) {
			if (line == '') {
				try {
					var data = JSON.parse(rlData);
					rlData = '';
					exchange.publish('', data);
					LOG.success('Sent', JSON.stringify(data));
				} catch (e) {
					LOG.error('Not sent:', e.message);
				}

				rl.setPrompt('Message (JSON): ');
			} else {
				rlData += line;
				rl.setPrompt('');
			}

			rl.prompt();
		}).on('close', function() {
			connection.disconnect();
		})
	});
});
