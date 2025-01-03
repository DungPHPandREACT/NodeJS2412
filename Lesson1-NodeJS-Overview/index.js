const fs = require('fs');
const path = require('path');
const http = require('http');

const dataFilePath = path.join(__dirname, 'data.json');

const readDataFromFile = () => {
	const data = fs.readFileSync(dataFilePath, 'utf8');
	return JSON.parse(data || '[]');
};

const writeDataToFile = (data) => {
	fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
	const { method, url } = req;
	let body = '';

	if (url.startsWith('/users')) {
		req.on('data', (data) => {
			body += data.toString();
		});
	}

	req.on('end', () => {
		if (method === 'GET') {
			console.log('vào GET');
			const users = readDataFromFile();
			console.log('users: ', users);
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(users));
		}
		if (method === 'POST') {
			const users = readDataFromFile();
			const newUser = JSON.parse(body);
			newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
			users.push(newUser);
			writeDataToFile(users);
			res.statusCode = 201;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(newUser));
		}
		if (method === 'PUT') {
			const users = readDataFromFile();
			console.log('url: ', url);
			const userId = parseInt(url.split('/')[2]);
			console.log('userId: ', userId);
			const updateUser = JSON.parse(body);
			console.log('users: ', users);
			const userIndex = users.findIndex((user) => user.id == userId);

			if (userIndex !== -1) {
				users[userIndex] = { id: userId, ...updateUser };
				writeDataToFile(users);
				res.statusCode = 201;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(users[userIndex]));
			} else {
				res.statusCode = 404;
				res.end(JSON.stringify({ message: 'User not found' }));
			}
		}
		if (method === 'DELETE') {
			const users = readDataFromFile();
			const userId = parseInt(url.split('/')[2]);
			const filteredUser = users.filter((user) => user.id !== userId);

			if (users.length !== filteredUser) {
				writeDataToFile(filteredUser);
				res.statusCode = 204;
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({ message: 'Delete successfully' }));
			} else {
				res.statusCode = 404;
				res.end(JSON.stringify({ message: 'User not found' }));
			}
		}
	});
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Server đang được chạy trên port: ${PORT}`);
});
