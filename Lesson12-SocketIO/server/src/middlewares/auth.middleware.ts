import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { CustomSocket } from '../types/socket.type';
import { User } from '../types/user.type';
import { Socket } from 'socket.io';

export const authMiddleware = (
	socket: Socket,
	next: (error?: Error) => void
) => {
	const token = socket.handshake.auth.token;

	if (!token) {
		return next(new Error('Thiếu token'));
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		(socket as CustomSocket).user = decoded as User;
		next();
	} catch (error) {
		next(new Error('Token không hợp lệ'));
	}
};
