// Thêm sách: Cho phép thêm một sách mới vào hệ thống, bao gồm cả thông tin về tác giả. 
// Lấy danh sách sách: Hiển thị danh sách tất cả các sách kèm theo thông tin tác giả. 
// Cập nhật thông tin sách: Cập nhật thông tin của một sách theo ID. 
// Xóa sách: Xóa một sách theo ID
import express from 'express';
import { addBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/book.controller';


const router = express.Router();

// /api/v1/book
router.post('/', addBook);
router.get('/', getBooks);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;