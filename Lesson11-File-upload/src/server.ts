import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';

const app = express();
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(uploadDir));

const PORT = 8080;

// alt + shift + o
// const storage = multer.diskStorage({
// 	destination: (req: Request, file: Express.Multer.File, cb) => {
// 		const uploadDir = 'uploads/';

// 		if (!fs.existsSync(uploadDir)) {
// 			fs.mkdirSync(uploadDir);
// 		}

// 		cb(null, uploadDir);
// 	},
// 	filename: (req: Request, file: Express.Multer.File, cb) => {
// 		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
// 		cb(null, uniqueSuffix + path.extname(file.originalname));
// 	},
// });

const storage = multer.memoryStorage();

const upload = multer({
	storage: storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req: Request, file: Express.Multer.File, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const mimetype = filetypes.test(file.mimetype);

		if (mimetype) {
			return cb(null, true);
		}

		cb(new Error('Chỉ cho phép upload hình ảnh!'));
	},
});

app.post(
	'/upload',
	upload.single('file'),
	async (req: Request, res: Response) => {
		if (req.file) {
			try {
				const outputFilename = `processed-${Date.now()}-${req.file.originalname}.jpeg`;
				const outputFilePath = path.join(uploadDir, outputFilename);
				
				await sharp(req.file.buffer)
					.resize(800)
					.toFormat('jpeg', { quality: 80 })
					.toFile(outputFilePath);

				res.send(`File đã được upload và xử lý thành công:
					<a href="/uploads/${outputFilename}">Xem hình ảnh</a>	
				`)

				// res.status(201).json({
				// 	message: 'File đã được upload và xử lý thành công',
				// 	filename: req.file.filename,
				// });
			} catch (error) {
				res.status(500).json({
					mesage: 'Đã xảy ra lỗi khi xử lý hình ảnh',
				});
			}
		} else {
			res.status(400).json({
				mesage: 'Upload file không thành công',
			});
		}
	}
);

app.listen(PORT, () => {
	console.log('Code đã được chỉnh sửa');
	console.log('Server is running on port', PORT);
});
