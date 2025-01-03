import express from 'express';
import authorRoutes from './modules/author/routes/author.route'

const app = express();
// Câu lệnh này giúp express đọc được body từ request gửi lên với định dạng là json
app.use(express.json());

const PORT = 4000;

app.use('/api/v1/authors', authorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})