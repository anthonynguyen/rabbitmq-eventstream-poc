# RabbitMQ Event Stream POC

Proof of concept for a RabbitMQ-based event stream.


## Architecture diagram
The items highlighted in yellow are what this POC implements.

![Diagram](/images/main.png "Diagram")


## How to use
1. Ensure you have running instances of MongoDB and RabbitMQ and edit `config.js` with their connection information.
2. Run `npm install`
3. Run `node sender.js` in one terminal window
4. In other terminal window(s), you can run `node receiver.js` and/or `node simple_receiver.js`
5. In the window with `sender.js`, type your events in JSON format (see examples below)
6. If `simple_receiver.js` is running, you should see the event output to the console
7. If `receiver.js` is running and the event is valid, you should see a new document in Mongo


## Events

### New User
##### Format
```
{
	created: {type: Date, required: true, default: Date.now},
	firstName: {type: String, required: true},
	lastName: {type: String},
	username: {type: String, required: true},
	email: {type: String, required: true},
	type: {type: String, required: true, enum: ['FREE', 'PREMIUM', 'EMPLOYEE']},
	country: {type: String, required: true},
}
```
##### Example
```json
{"type": "NewUserEvent", "event": {"firstName": "Anthony", "lastName": "Nguyen", "username": "anthony", "email": "anthony.nguyen@qlik.com", "type": "EMPLOYEE", "country": "Canada"}}
```

### New App
##### Format
```
{
	created: {type: Date, required: true, default: Date.now},
	owner: {type: String, required: true},
	title: {type: String, required: true},
}
```

##### Example
```json
{"type": "NewAppEvent", "event": {"owner": "anthony", "title": "Test Dashboard"}}
```
