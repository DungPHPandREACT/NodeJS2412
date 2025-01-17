import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from './comment.model';

export interface IPost extends Document {
    title: string;
    content: string;
    comments: Array<IComment['_id']>
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
});

export default mongoose.model<IPost>('posts', PostSchema);
