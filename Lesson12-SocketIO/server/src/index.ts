import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		methods: ['GET', 'POST'],
	},
});

const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket: Socket) => {
	console.log(` Người dùng kết nối đến /chat: ${socket.id}`);

	socket.on('message', (msg: string) => {
		console.log(`[Chat] Tin nhắn từ ${socket.id}: ${msg}`);
		chatNamespace.emit(
			'message',
			` Người dùng ${socket.id} trong /chat: ${msg}`
		);
	});

	socket.on('disconnect', () => {
		console.log(` Người dùng ngắt kết nối từ /chat: ${socket.id}`);
	});
});

const sportsNameSpace = io.of('/sports');
sportsNameSpace.on('connection', (socket: Socket) => {
	console.log(` Người dùng kết nối đến /sports: ${socket.id}`);

	socket.on('message', (msg: string) => {
		console.log(`[Sports] Tin nhắn từ ${socket.id}: ${msg}`);
		sportsNameSpace.emit(
			'message',
			` Người dùng ${socket.id} trong /sports: ${msg}`
		);
	});

	socket.on('disconnect', () => {
		console.log(` Người dùng ngắt kết nối từ /sports: ${socket.id}`);
	});
});

const PORT = 3001;
server.listen(PORT, () => {
	console.log(`Server đang được chạy trên http://localhost:${PORT}`);
});
