import { Request, Response } from 'express';
import postModel from '../models/post.model';

export const createPost = async (req: Request, res: Response) => {
	try {
		const { title, content } = req.body;
		const newPost = new postModel({ title, content, comments: [] });

		await newPost.save();

		res.status(201).json({
			message: 'Tạo bài viết thành công',
			data: newPost,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const getPosts = async (req: Request, res: Response) => {
	try {
        // Lấy tất cả bài viết, và các bình luận của bài viết đó
		const posts = await postModel.find().populate('comments');

        res.status(200).json({
            data: posts
        })
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
