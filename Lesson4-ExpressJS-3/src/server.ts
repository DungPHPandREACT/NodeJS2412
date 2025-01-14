import express, { NextFunction, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(session({
	secret: 'your_secret_key',
	resave: false,
	saveUninitialized: true,
	cookie: {
		maxAge: 600000
	}
}))


declare module 'express-session' {
  interface SessionData {
	user: Record<string, string | number>;
  }
}

app.get('/login', (req: Request, res: Response) => {
	req.session.user = {
		id: 1, 
		name: 'T3H'
	}
	res.json({
		message: 'Đăng nhập thành công'
	})
})


app.get('/profile', (req: Request, res: Response, next: NextFunction) => {
	if(req.session.user){
		res.json({
			message: 'Thông tin người dùng',
			user: req.session.user
		})
	} else{
		res.json({
			message: 'Chưa đăng nhập'
		})
	}
})

app.use(cookieParser());
app.get('/set-cookie', (req: Request, res: Response) => {
	res.cookie('username', 'T3H', {
		maxAge: 600000,
		httpOnly: true,
	})

	res.json({
		message: 'Cookie đã được thiết lập'
	})
})

app.get('/get-cookie', (req: Request, res: Response) => {
	const username = req?.cookies?.username;
	console.log('req?.cookies: ', req?.cookies)
	res.json({
		message: `username là: ${username}`
	})
})

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});
