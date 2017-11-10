const express = require('express');
const router = express.Router();
const app = express();

const logger = require('./utils/logger');
app.use(logger);

app.get('/', function (req, res, next) {
	const status = 200;
	const message = `Welcome! We are not worrying about the visual :P`;
	res.status(status).json(message);
	next();
});

app.get('/promise', function (req, res, next) {
	var arg = 10;
	var message = 'OK!';

	new Promise(function (resolve, reject) {

		setTimeout(function () {

			for (let i = 0; i <= 10; i++) {
				console.log(i + '\n');
			}
		
			if (arg === 10)
				resolve(arg);
		}, 3000); // executes a function in a pre-defined time (ms)

	}).then(function (num) {
		console.log('\n==> first then: ', num); return num * 2;
	}).then(function (num) {
		console.log('==> second then: ', num); return num * 2;
	}).then(function (num) {
		console.log('==> last then: ', num);
	}).catch(function (err) {
		console.log('==> catch: ', err);
	});

	new Promise(function (resolve, reject) {

		setTimeout(function () { resolve(); }, 1000);

	}).then(function () {
		console.log('>>>>>>>>>>> I may be executed in the before!\n');
	});

	new Promise(function (resolve, reject) {
				setTimeout(function () { resolve(); }, 100);
			}).then(function () {
				console.log('>>>>>>>>>>> When am I executed??\n');
			});
	
	const status = 200;
	res.status(status).json(message);
});

const port = 3000;
app.listen(port);
console.log('Listening to port ' + port + '\n');

// https://davidwalsh.name/promises
// https://www.promisejs.org/
// https://developers.google.com/web/fundamentals/primers/promises
// https://developer.ibm.com/node/2016/08/24/promises-in-node-js-an-alternative-to-callbacks/