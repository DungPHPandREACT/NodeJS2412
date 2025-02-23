import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './configs/auth.config';
import { authenticateToken } from './middlewares/auth.middle';
import { RequestCustom } from './types/app.type';

const app = express();
app.use(express.json());

const PORT = 3000;

app.post('/login', (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (username === 'user1' && password === 'pass123') {
		const payload = {
			username,
		};

		const token = jwt.sign(payload, SECRET_KEY, {
			expiresIn: '1h',
		});

		res.json({
			message: 'Đăng nhập thành công',
			token,
		});
	} else {
		res.status(401).json({
			message: 'Thông tin chưa tồn tại',
		});
	}
});

app.get(
	'/protected',
	authenticateToken,
	(req: any, res: any) => {
		res.json({
			message: 'Đây là api được bảo vệ',
			user: req?.user,
		});
	}
);

// const users = [
// 	{
// 		username: 'user1',
// 		password: 'pass123'
// 	}
// ]

// app.post('/login', (req: Request, res: Response) =>{
// 	const {username, password} = req.body;

// 	console.log(req.body);

// 	const user = users.find((u) => u.username === username && u.password === password);

// 	console.log('user: ',user)

// 	if(user){
// 		res.status(200).json({
// 			message: 'Đăng nhập thành công'
// 		})
// 	} else {
// 		res.status(404).json({
// 			message: 'Thông tin chưa tồn tại'
// 		})
// 	}
// })

app.listen(PORT, () => {
	console.log(`Server đang được chạy trên PORT: ${PORT}`);
});
