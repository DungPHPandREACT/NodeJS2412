import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { authConfig } from '../configs/authConfig';

const generateToken = (userId: mongoose.Types.ObjectId) => {
	return jwt.sign({ userId }, authConfig.secretKey, { expiresIn: '1h' });
};

export default generateToken;