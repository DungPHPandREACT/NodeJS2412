import mongoose, { Document, Schema } from 'mongoose';
import { IPost } from './post.model';

export interface IComment extends Document {
	text: string;
	author: string;
	post_id: IPost['_id'];
}

const CommentSchema: Schema = new Schema(
	{
		text: { type: String, required: true },
		author: { type: String, required: true },
		post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model<IComment>('comments', CommentSchema);
