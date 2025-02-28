import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from './configs/auth.config';
import { authenticateToken } from './middlewares/auth.middle';

const app = express();
app.use(express.json());

const PORT = 3000;

const refreshTokens: string[] = [];
const backListTokens: string[] = [];

app.post('/login', (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (username === 'user1' && password === 'pass123') {
		const payload = {
			username,
		};
		const token = jwt.sign(payload, SECRET_KEY, {
			expiresIn: '1h',
		});
		const refreshToken = jwt.sign(payload, SECRET_KEY);
		refreshTokens.push(refreshToken);
		res.json({
			message: 'Đăng nhập thành công',
			token,
			refreshToken,
		});
	} else {
		res.status(401).json({
			message: 'Thông tin chưa tồn tại',
		});
	}
});

app.post('/token', (req: Request, res: Response) => {
	const { refreshToken } = req.body;
	if (!refreshToken) {
		res.status(403).json({
			message: 'Refresh token không hợp lệ',
		});
		return;
	}
	if (!refreshTokens.includes(refreshToken)) {
		res.status(403).json({
			message: 'Refresh token không hợp lệ',
		});
		return;
	}
	jwt.verify(refreshToken, SECRET_KEY, (error: any, payload: any) => {
		if (error) {
			res.status(403).json({ message: 'Refresh token không hợp lệ', error });
		} else {
			const token = jwt.sign(payload, SECRET_KEY, {
				expiresIn: '1h',
			});
			res.json({
				token: token,
			});
		}
	});
});

app.post('/logout', (req: any, res: Response) => {
	const { refreshToken } = req.body;
	if (!refreshToken) {
		res.status(403).json({
			message: 'Refresh token không hợp lệ',
		});
		return;
	}
	const index = refreshTokens.indexOf(refreshToken);
	if (index !== -1) {
		refreshTokens.splice(index, 1);
		backListTokens.push(req.token);
		res.json({
			message: 'Đăng xuất thành công',
		});
	}
	res.json({
		message: 'Đăng xuất không thành công',
	});
});

app.get('/protected', authenticateToken, (req: any, res: any) => {
	if(backListTokens.includes(req.token)){
		return res.status(403).json({
			message: 'Token đã bị thu hồi'
		})
	}
	res.json({
		message: 'Đây là api được bảo vệ',
		user: req?.user,
	});
});

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
