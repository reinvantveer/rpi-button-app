'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'RPI button app' });
const wpi = require('wiring-pi');
const express = require('express');
const app = express();

//wpi.on('change', (channel, value) => {
//	log.info('Channel ' + channel + ' value is now ' + value);
//});

wpi.setup('sys');
//wpi.pinMode(4, wpi.OUTPUT);
//wpi.pullUpDnControl(4, wpi.PUD_DOWN)

wpi.wiringPiISR(4, wpi.INT_EDGE_BOTH, delta => {
  log.info(`Pin 4 changed to ${delta}`);
});
	
const pins = new Array(23).fill(null);
pins.forEach((pin, index) => {
	pin = index + 1;
	wpi.pinMode(pin, wpi.INPUT);
	log.info(`Pin ${pin} is at ${wpi.digitalRead(pin)}`);
});

app.get('/', (req, res) => {
	const value = wpi.digitalRead(4);
	log.info(`Setting pin 4 to ${+!value}`);
	res.send(`Pin 4: ${value}`);	// The current state of the pin 
	wpi.digitalWrite(4, +!value);
	
	//value === 1 ? wpi.digitalWrite(4, 0) : wpi.digitalWrite(4, 1);
});


app.listen(3000);

log.info('App listening at port 3000');
