import express, { Request, Response } from 'express';
import path from 'path';
import bookRouter from './routes/bookRoutes';

const app = express();

const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// route api author (tác giả)
// Create: thêm mới
app.post('/api/author', (req: Request, res: Response) => {
	res.json({
		message: 'Thêm mới tác giả thành công',
	});
});
// Read: lấy danh sách tác giả
app.get('/api/author', (req: Request, res: Response) => {
	const page = req.query.page;
	const limit = req.query.limit;

	const users = [
		{
			id: 1,
			name: 'user 1',
		},
		{
			id: 2,
			name: 'user 2',
		},
		{
			id: 3,
			name: 'user 3',
		},
	];

	res.render('users', {users});
});
// Update: cập thông tin tác giả
app.put('/api/author/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	res.json({
		message: `Cập nhật thông tin tác giả có id là: ${id}`,
	});
});
// Delete: xóa tác giả
app.delete('/api/author/:id', (req: Request, res: Response) => {
	const id = req.params.id;

	res.json({
		message: `Xóa thông tin tác giả có id là : ${id}`,
	});
});

// route api book (sách)
app.use('/api/book', bookRouter);

app.listen(PORT, () => {
	console.log(`Server đang được chạy trên PORT: ${PORT}`);
});
