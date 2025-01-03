import express from 'express';
import authorRoutes from './modules/author/routes/author.route';
import bookRoutes from './modules/book/routes/book.route';

const app = express();
// Câu lệnh này giúp express đọc được body từ request gửi lên với định dạng là json
app.use(express.json());

const PORT = 4000;

app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/books', bookRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
