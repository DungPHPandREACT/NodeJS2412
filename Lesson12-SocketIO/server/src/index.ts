import cors from 'cors';
import express, { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { ALLOWED_ORIGINS, PORT, RATE_LIMIT_MAX } from './config';
import { authMiddleware } from './middlewares/auth.middleware';
import { CustomSocket } from './types/socket.type';
import { createToken } from './utils/createToken';

const app = express();
app.use(express.json());

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: ALLOWED_ORIGINS,
	},
});

io.use(authMiddleware);

io.on('connection', (socket: Socket) => {
	const user = (socket as CustomSocket).user;
	console.log(`User connected: ${user.name}`);
	socket.on('message', (msg: string) => {
		console.log('msg: ', msg)

		socket.broadcast.emit('message', msg, user.name);
	});
});

app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(helmet());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: RATE_LIMIT_MAX,
	message: 'Too many request from this IP, please try again later',
});
app.use(limiter);

app.post('/get-token', (req: Request, res: Response) => {
	const { name } = req.body;
	const token = createToken(name);

	res.json({ token });
});

httpServer.listen(PORT, () => {
	console.log(`Server đang được chạy trên http://localhost:${PORT}`);
});
