/*
Created by Andrew DeChristopher <drew@kiir.us> on 2/17/2017.
*/

const ipc = require('node-ipc');
const cron = require('cron');
const rstr = require('randomstring');

ipc.config.id = rstr.generate(7);
ipc.config.retry = 1500;

let hasData = false;
let storedData;

if (process.argv.length > 2) {
	if (process.argv[2] === 'data') {
		storedData = 'cooldata';
		hasData = true;
	}
} else {
	hasData = false;
}

let showData = cron.job('*/5 * * * * *', function () {
	console.log('DATA: [' + storedData + ']');
});

ipc.connectTo('world', function () {
	ipc.of.world.on('connect', function () {
		ipc.log('## connected to world ##', ipc.config.delay);
		ipc.of.world.emit(
            'checkData',
            '1'
        );

		if (hasData) {
			ipc.of.world.emit('setData', storedData);
		}
	});

	ipc.of.world.on('data', function (data) {
		storedData = data;
	});

	ipc.of.world.on('disconnect', function () {
		ipc.log('disconnected from world');
	});
});

showData.start();
