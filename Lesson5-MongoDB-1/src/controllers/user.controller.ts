import { Request, Response } from 'express';
import profileModel from '../models/profile.model';
import userModel from '../models/user.model';

export const createUserWithProfile = async (req: Request, res: Response) => {
	try {
		const { name, email, age, address, phone } = req.body;

		// Tạo mới profile
		const newProfile = new profileModel({ age, address, phone });
		await newProfile.save();

		// Tạo mới user
		const newUser = new userModel({ name, email, profile_id: newProfile._id });
		await newUser.save();

		res.status(201).json({
			message: 'Tạo mới user thành công',
			data: { ...newUser, profile: newProfile },
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await userModel.find().populate('profile_id');

		res.status(200).json({
			data: users,
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		// Tìm user và lấy thông tin
		const user = await userModel.findById(id);

		if (!user) {
			res.status(404).json({
				message: 'User not found',
			});

			return;
		}

		const profile_id = user.profile_id;

		await profileModel.findByIdAndDelete(profile_id);
		await userModel.findByIdAndDelete(user._id);

		res.status(200).json({
			message: 'User deleted successfully',
		});
	} catch (error: any) {
		res.status(400).json({
			message: error.message,
		});
	}
};
