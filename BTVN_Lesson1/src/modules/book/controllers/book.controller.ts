import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { books } from '../models/book.model';
// Thêm sách: Cho phép thêm một sách mới vào hệ thống, bao gồm cả thông tin về tác giả.
export const addBook = (req: Request, res: Response): any => {
	const { title, author, category, publishedYear, numberOfPages } = req.body;

	if (!title || !author || !category || !publishedYear || !numberOfPages) {
		return res.status(400).json({
			message: 'Vui lòng nhập đầy đủ thông tin',
		});
	}

	const newBook = {
		id: uuidv4(),
		title,
		author,
		category,
		publishedYear,
		numberOfPages,
	};

	books.push(newBook);

	res.status(201).json({
		message: 'Thêm mới sách thành công',
		data: newBook,
	});
};
// Lấy danh sách sách: Hiển thị danh sách tất cả các sách kèm theo thông tin tác giả.
export const getBooks = (req: Request, res: Response) => {
	res.status(200).json({
		data: books,
	});
};
// Lấy chi tiết sách: Hiển thị thông tin cụ thể của 1 cuốn sách.
export const getBook = (req: Request, res: Response) => {
	const { id } = req.params;

	const book = books.find((element) => element.id == id);
	if (book) {
		res.status(200).json({
			data: book,
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy cuốn sách phù hợp',
		});
	}
};
// Cập nhật thông tin sách: Cập nhật thông tin của một sách theo ID.
export const updateBook = (req: Request, res: Response): any => {
	const { id } = req.params;
	const { title, author, category, publishedYear, numberOfPages } = req.body;

	if (!title || !author || !category || !publishedYear || !numberOfPages) {
		return res.status(400).json({
			message: 'Vui lòng nhập đầy đủ thông tin',
		});
	}

	const index = books.findIndex((element) => element.id == id);

	if (index !== -1) {
		const updateBook = {
			id,
			title,
			author,
			category,
			publishedYear,
			numberOfPages,
		};

		books[index] = updateBook;

		res.status(200).json({
			data: updateBook,
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy cuốn sách phù hợp',
		});
	}
};
// Xóa sách: Xóa một cuốn sách theo ID
export const deleteBook = (req: Request, res: Response) => {
	const { id } = req.params;

	const index = books.findIndex((element) => element.id == id);

	if (index !== -1) {
		books.splice(index, 1);
		res.status(200).json({
			message: 'Xóa cuốn sách thành công',
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy cuốn sách phù hợp',
		});
	}
};
