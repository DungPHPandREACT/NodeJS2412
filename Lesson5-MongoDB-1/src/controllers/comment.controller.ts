import { Request, Response } from 'express';
import commentModel from '../models/comment.model';
import postModel from '../models/post.model';

export const createComment = async (req: Request, res: Response) => {
	try {
		const { text, author, post_id } = req.body;

		// Kiểm tra xem bài viết có tồn tại không
		const post = await postModel.findById(post_id);

		if (!post) {
			res.status(404).json({
				message: 'Bài viết không tồn tại',
			});

            return;
		}

		const newComment = new commentModel({ text, author, post_id });
		await newComment.save();

		// Thêm id của bình luận vừa tạo vào bài viết
		post?.comments.push(newComment._id);
		await post.save();

		res.status(201).json({
			message: 'Tạo mới bình luận thành công',
			data: newComment,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

// Lấy tất cả bình luận của 1 bài viết
export const getCommentsByPostId = async (req: Request, res: Response) => {
	try {
		const { post_id } = req.params;

		const comments = await commentModel.find({ post_id });

		res.status(200).json({
			data: comments,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
