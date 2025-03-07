let socket;

function connectToNamespace(namespace) {
	if (socket) {
		socket.disconnect();
	}

	socket = io(`http://localhost:3001${namespace}`);

	document.getElementById(
		'namespace-title'
	).innerText = `Namepsace: ${namespace}`;
	document.getElementById('messages').innerHTML = '';

	socket.on('message', (msg) => {
		const li = document.createElement('li');
		li.textContent = msg;
		document.getElementById('messages').appendChild(li);
	});

	socket.on('connect', () => {
		console.log(` Kết nối thành công đến ${namespace} với ID: ${socket.id}`);
	});

	socket.on('disconnect', () => {
		console.log(` Đã ngắt kết nối từ ${namespace}`);
	});
}

document.getElementById('connect-chat').onclick = () => {
	connectToNamespace('/chat');
};

document.getElementById('connect-sports').onclick = () => {
	connectToNamespace('/sports');
};

document.getElementById('send').onclick = () => {
	const message = document.getElementById('message').value;
	if (message && socket) {
		socket.emit('message', message);

		const li = document.createElement('li');
		li.textContent = ` Bạn: ${message}`;
		document.getElementById('messages').appendChild(li);

		document.getElementById('message').value = '';
	}
};
