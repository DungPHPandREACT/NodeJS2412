import express, { Request, Response } from 'express';
import Joi from 'joi';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

const PORT = 8080;

const schema = Joi.object({
	username: Joi.string().min(2).max(30).required().messages({
		'string.min': `username đang quá ngắn`,
		'string.max': `username đang quá dài`,
		'any.required': `username là trường bắt buộc`,
	}),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(24).required(),
});

app.post('/api/v1/auth/register', (req: Request, res: Response) => {
	const info = req.body;

	const { error } = schema.validate(info);

	if (error) {
		res.status(400).json({
			error: error.details[0].message,
		});
	}

	res.status(200).json({
		message: 'Đăng ký thành công',
	});
});

const validator = [
    body('email').notEmpty().withMessage('email là trường bắt buộc')
        .isEmail().withMessage('email chưa hợp lệ'),
    body('password').notEmpty().withMessage('password là trường bắt buộc')
        .isLength({ min: 6, max: 24 }).withMessage('password phải có độ dài từ 6 đến 24 ký tự'),
]

app.post('/api/v1/auth/login',validator, (req: Request, res: Response) => {
	const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()
        })

        return;
    }
	res.status(200).json({
		message: 'Login thành công',
	});
});

app.listen(PORT, () => {
	console.log('Code đã được chỉnh sửa');
	console.log('Server is running on port', PORT);
});
