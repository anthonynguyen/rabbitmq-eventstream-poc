# RabbitMQ Event Stream POC

Proof of concept for a RabbitMQ-based event stream.


## Architecture diagram
#### POC Architecture
![POC Architecture](/images/poc.png "POC Architecture")

#### Reference Architecture
![Reference Architecture](/images/reference.png "Reference Architecture")
![Reference Architecture Reference](/images/IMG_1619.JPG "Reference Architecture Reference")

## How to use
1. Ensure you have running instances of MongoDB and RabbitMQ and edit `config.js` with their connection information.
2. Run `npm install`
3. Run `node sender.js` in one terminal window
4. In other terminal window(s), you can run `node receiver.js` and/or `node simple_receiver.js`
5. In the window with `sender.js`, type your events in JSON format (see examples below)
6. If `simple_receiver.js` is running, you should see the event output to the console
7. If `receiver.js` is running and the event is valid, you should see a new document in Mongo


## Events
1. [Create User](#create-user)
2. [Create App](#create-app)
3. [Delete App](#delete-app)
4. [Share Public Stream](#share-public-stream)
5. [Unshare Public Stream](#unshare-public-stream)

### Create User
##### Format
```
{
	createdAt: {type: Date, required: true, default: Date.now},
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
{
	"type": "CreateUserEvent",
	"event": {
		"firstName": "Anthony",
		"lastName": "Nguyen",
		"username": "anthony",
		"email": "anthony.nguyen@qlik.com",
		"type": "EMPLOYEE",
		"country": "Canada"
	}
}
```

### Create App
##### Format
```
{
	createdAt: {type: Date, required: true, default: Date.now},
	createdBy: {type: String, required: true},
	title: {type: String, required: true},
}
```

##### Example
```json
{
	"type": "CreateAppEvent",
	"event": {
		"createdBy": "anthony",
		"title": "Test Dashboard"
	}
}
```

### Delete App
##### Format
```
{
	deletedAt: {type: Date, required: true, default: Date.now},
	deletedBy: {type: String, required: true},
	title: {type: String, required: true},
}
```

##### Example
```json
{
	"type": "DeleteAppEvent",
	"event": {
		"deletedBy": "anthony",
		"title": "Test Dashboard"
	}
}
```

### Share Public Stream
##### Format
```
{
	sharedAt: {type: Date, required: true, default: Date.now},
	sharedBy: {type: String, required: true},
	sharedTo: {type: String, required: true},
}
```

##### Example
```json
{
	"type": "ShareStreamEvent",
	"event": {
		"sharedBy": "anthony",
		"sharedTo": "example@example.com"
	}
}
```

### Unshare Public Stream
##### Format
```
{
	unsharedAt: {type: Date, required: true, default: Date.now},
	unsharedBy: {type: String, required: true},
	unsharedFrom: {type: String, required: true},
}
```

##### Example
```json
{
	"type": "UnshareStreamEvent",
	"event": {
		"unsharedBy": "anthony",
		"unsharedFrom": "example@example.com"
	}
}
```
