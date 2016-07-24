'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'RPI button app' });
const wpi = require('wiring-pi');
const express = require('express');
const app = express();

wpi.setup('sys');

wpi.wiringPiISR(4, wpi.INT_EDGE_BOTH, () => {
	const value = wpi.digitalRead(4);
  log.info(`Pin 4 changed to ${value}`);
});

app.get('/', (req, res) => {
	const value = wpi.digitalRead(4);
	res.send(`Pin 4: ${value}`);
});

app.listen(3000);
log.info('App listening at port 3000');

process.on('SIGINT', function () {
	console.log(' Ctrl-C detected, exiting...');
	wpi.wiringPiISRCancel(4);
	process.exit(2);
});
