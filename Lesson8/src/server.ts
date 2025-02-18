import express, { NextFunction, Request, Response } from 'express';
import { normalizeUsername } from './function.pipe';
import { checkAuthentication, checkAuthorization } from './user.guards';
import { EventEmitter } from 'events';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const middleware1 = (req: Request, res: Response, next: NextFunction) => {
	let condition1 = true;
	console.log('vào middleware1');
	if (condition1) {
		next();
		return;
	}

	res.status(200).json({
		message: 'Dừng lại ở middleware1',
	});
};

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
	let condition2 = false;
	console.log('vào middleware2');
	if (condition2) {
		next();
		return;
	}

	res.status(200).json({
		message: 'Dừng lại ở middleware2',
	});
};

const middleGlobal = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('Tất cả đều chạy middleware này');
	console.log('Người dùng đã vào: ', req.path);

	console.log(err);

	next();
};

app.use(middleGlobal);

app.get('/test1', middleware1, middleware2, (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Hello',
	});
});

app.get('/test2', (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Hello test2',
	});
});

const myEmitter = new EventEmitter();
myEmitter.on('register', (email) => {
	console.log('Đã gửi email đến địa chỉ: ', email)
})

app.post(
	'/test3',
	(req: Request, res: Response) => {
		const data = req.body;
		console.log('data: ', data);

		myEmitter.emit('register', 't3h@gmail.com')

		res.status(200).json({
			data: data,
		});
	}
);

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
