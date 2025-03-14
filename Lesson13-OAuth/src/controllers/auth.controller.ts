import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import User from '../models/user.model';
import generateToken from '../utils/generateToken';
import { comparePassword } from '../utils/hashPassword';

export const googleAuth = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
};

export const googleCallback = (req: Request, res: Response, next: NextFunction) => {
	
	passport.authenticate(
		'google',
		{ failureRedirect: '/' },
		(err: any, user: any) => {
			if (err) {
				return res
					.status(500)
					.json({ message: 'Authentication failed', error: err });
			}
			if (user) {
				const token = generateToken(user._id);
				return res.json({ message: 'Authentication successfull', token });
			}

			return res.status(400).json({
				message: 'User not found',
			});
		}
	)(req, res, next);
};

export const emailLogin = async (req: Request, res: Response): Promise<any> => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		return res.status(400).json({
			message: 'User not found',
		});
	}

	const isPasswordValid = await comparePassword(password, user.password);
	if (!isPasswordValid) {
		return res.status(400).json({ message: 'Invalid password' });
	}

	const token = generateToken(user._id as mongoose.Types.ObjectId);
	return res.json({ message: 'Login successful', token });
};
