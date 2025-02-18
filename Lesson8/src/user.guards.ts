import { NextFunction, Request, Response } from 'express';
interface User {
	username: string;
	token: string;
}
export const checkAuthentication = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers['authorization'];
	if (authHeader && authHeader.startsWith('Bearer')) {
		const token = authHeader.split(' ')[1];
		if (token === 'abc') {
			next();
		} else {
			res.status(401).json({
				message: 'Token không hợp lệ',
			});

			return;
		}
	} else {
		res.status(401).json({
			message: 'Bạn cần phải đăng nhập',
		});
	}
};


export const checkAuthorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const role = req.headers['role'];
	if(role==='admin'){
        next();
    }

    res.status(403).json({
        message: 'Bạn không đủ quyền truy cập vào tài nguyên'
    })
};