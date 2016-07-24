'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({ name: 'RPI button app' });
const gpio = require('rpi-gpio');
const express = require('express');
const app = express();

//gpio.on('change', (channel, value) => {
//	log.info('Channel ' + channel + ' value is now ' + value);
//});

gpio.setup(7, gpio.DIR_OUT, err => {
	if (err) {
		gpio.destroy();
		throw err;
	}

	setInterval(
		() => {
	        gpio.read(7, (err, value) => {
				if (err) {
					gpio.destroy();
					throw err;
				}
				log.info(`Pin 7: ${value}`);
			});
	    }, 60000
	);
});
	
app.get('/', (req, res) => {
	gpio.read(7, (err, value) => {
		gpio.write(7, !value, err => {
			if (err) throw err;
		});
		if (err) throw err;
		res.send(`Pin 7: ${value}`);	// The current state of the pin 
	});
});


app.listen(3000);

log.info('App listening at port 3000');
