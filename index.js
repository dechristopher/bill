/*
Created by Andrew DeChristopher <drew@kiir.us> on 2/17/2017.
*/

const ipc = require('node-ipc');

ipc.config.id = 'world';
ipc.config.retry = 1500;

ipc.serve(function () {
	ipc.server.on('message', function (data, socket) {
		ipc.log('got a message : ', data);
		ipc.server.emit(
			socket,
			'message',  // this can be anything you want so long as your client knows.
			data + ' world!'
		);
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
