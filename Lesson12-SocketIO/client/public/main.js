let socket;

document.getElementById('create-token').onclick = async () => {
	const name = document.getElementById('name').value;

	const response = await fetch('http://localhost:3001/get-token', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ name }),
	});

	const data = await response.json();
	console.log('data: ', data);
	document.getElementById('name').value = data.token;
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

document.getElementById('connect').onclick = () => {
	const token = document.getElementById('token').value;

	console.log('token: ', token);

	socket = io('http://localhost:3001', {
		auth: {
			token,
		},
	});

	socket.on('connect', () => {
		document.getElementById('status').innerText = 'Đã kết nối';
		console.log(` Kết nối thành công với ID: ${socket.id}`);
	});

	socket.on('connect_error', (error) => {
		document.getElementById('status').innerText = 'Xác thực thất bại!';
		console.log('error: ', error);
		console.error('Lỗi kết nối: ', error.message);
	});

	socket.on('message', (msg, name) => {
		console.log('msg: ', msg);

		const li = document.createElement('li');
		li.textContent = ` ${name}: ${msg}`;
		document.getElementById('messages').appendChild(li);
		document.getElementById('message').value = '';
	});
};
