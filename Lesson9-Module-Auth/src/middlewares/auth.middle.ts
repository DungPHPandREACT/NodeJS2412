import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../configs/auth.config';
import { RequestCustom } from '../types/app.type';

export const authenticateToken = (
	req: any,
	res: any,
	next: any
): any => {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		res.status(401).json({
			message: 'Bạn chưa đăng nhập',
		});

		return;
	}

	jwt.verify(token, SECRET_KEY, (error: any, payload: any) => {
		if (error) {
			res.status(403).json({ message: 'Token không hợp lệ' });
		} else {
            req.user = payload ?? {};
            next();
        }
	});
};