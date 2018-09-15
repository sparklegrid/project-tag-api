/*
 |--------------------------------------
 | MongoDB
 |--------------------------------------
 */

require('dotenv').config();
const config = require('./config');
const mongoose = require('mongoose');


// Simple function to color text in the console output
function logColor(msg, color) {
	let colors = {
		red: ['\x1b[31m', '\x1b[0m'],
		green: ['\x1b[32m', '\x1b[0m'],
		yellow: ['\x1b[33m', '\x1b[0m'],
		blue: ['\x1b[34m', '\x1b[0m']
	};
	return (!colors[color] ? msg : colors[color][0] + msg + colors[color][1]);
}

module.exports = function () {
	mongoose.connect(config.MONGO_URI, {useNewUrlParser: true}).catch();
	mongoose.Promise = global.Promise;

	const mongoDb = mongoose.connection;

	mongoDb.once('open', function callback() {
		console.info(logColor('Connected to MongoDB:', 'green'), config.MONGO_URI);
	});
	mongoDb.on('error', () => {
		console.error(logColor('MongoDB Connection Error. Please make sure that', 'yellow'), config.MONGO_URI, logColor('is running.', 'yellow'));
	});
};
