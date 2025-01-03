import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Author } from '../dto/author.dto';
import { authors } from '../models/author.model';

// Thêm tác giả: Cho phép thêm một tác giả mới vào hệ thống.
export const addAuthor = (req: Request, res: Response) => {
	// destructuring
	const { name, country, birthday } = req.body;

	// Đang bị thiếu phần validate (kiểm tra xem tác giả đã tồn tại chưa)

	const newAuthor: Author = {
		id: uuidv4(),
		name,
		country,
		birthday,
	};

	authors.push(newAuthor);

	res.status(201).json({
		message: 'Thêm tác giả thành công',
		data: newAuthor,
	});
};

// Lấy danh sách tác giả: Hiển thị danh sách tất cả các tác giả.
export const getAuthors = (req: Request, res: Response) => {
	res.status(200).json({
		data: authors,
	});
};

// Lấy chi tiết tác giả: Hiển thị thông tin cụ thể của 1 tác giả.
export const getAuthor = (req: Request, res: Response) => {
	const { id } = req.params;

	const author = authors.find((element) => element.id == id);
	if (author) {
		res.status(200).json({
			data: author,
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy tác giả phù hợp',
		});
	}
};

// Cập nhật thông tin tác giả: Cập nhật thông tin của một tác giả theo ID.
export const updateAuthor = (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, country, birthday } = req.body;

	const index = authors.findIndex((element) => element.id == id);

	if (index !== -1) {
		const updateAuthor = {
			id,
			name,
			country,
			birthday,
		};

		authors[index] = updateAuthor;

		res.status(200).json({
			data: updateAuthor,
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy tác giả phù hợp',
		});
	}
};

// Xóa tác giả: Xóa một tác giả theo ID.
export const deleteAuthor = (req: Request, res: Response) => {
	const { id } = req.params;

	const index = authors.findIndex((element) => element.id == id);

	if (index !== -1) {
		authors.splice(index, 1);
		res.status(200).json({
			message: 'Xóa tác giả thành công',
		});
	} else {
		res.status(404).json({
			message: 'Không tìm thấy tác giả phù hợp',
		});
	}
};
