/*
Created by Andrew DeChristopher <drew@kiir.us> on 2/17/2017.
*/

// core libraries
const ipc = require('node-ipc');
const cron = require('cron');

// custom libraries
let cfg = require('./modules/cfg');
let d = require('./modules/data');

let persist = false;

ipc.config.id = 'world';
ipc.config.retry = 1500;

// let showData = cron.job('*/5 * * * * *', function () {
// 	console.log('DATA: [' + storedData + ']');
// });

ipc.serve(function () {
	ipc.server.on('checkData', function (data, socket) {
		if (persist) {
			ipc.server.emit(
				socket,
				'data',
				d
			);
			persist = true;
			console.log('bill sent data: [' + storedData + '] to ' + socket);
		} else {
			ipc.server.emit(
				socket,
				'nodata',
				'0'
			);
			console.log('bill doesn\'t have data to send');
		}
	});

	ipc.server.on('setData', function (data, socket) {
		d = data;
		persist = true;
		console.log('bill got data [' + d + '] from ' + socket);
	});

	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
// showData.start();
