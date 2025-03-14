import express from 'express';
import {
	emailLogin,
	googleAuth,
	googleCallback,
} from '../controllers/auth.controller';

const router = express.Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleCallback);

router.post('/auth/login', emailLogin);

export default router;
