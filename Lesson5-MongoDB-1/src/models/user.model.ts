import mongoose, { Document, Schema } from 'mongoose';
import { Profile } from './profile.model';

export interface User extends Document {
	name: string;
	email: string;
	profile_id: Profile['_id'];
}

const UserSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' },
});

export default mongoose.model<User>('users', UserSchema);
