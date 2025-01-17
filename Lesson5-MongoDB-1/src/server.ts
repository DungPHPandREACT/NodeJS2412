import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import coursesRouter from './routes/course.route';
import usersRouter from './routes/user.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/nodejs2412-courseManagement'

const connectDB = async () => {
	try {
		await mongoose.connect(
			DATABASE_URL
		);
		console.log('Kết nối đến MongoDB thành công');
	} catch (error) {
		console.log('Lỗi kết nối đến MongoDB', error);
		process.exit(1);
	}
};

app.use(express.json())
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
	connectDB();
});
