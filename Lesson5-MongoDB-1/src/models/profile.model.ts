import mongoose, { Document, Schema } from 'mongoose';

export interface Profile extends Document {
	age: number;
	address: string;
	phone: string;
}

const ProfileSchema: Schema = new Schema({
	age: { type: Number, required: true },
	address: { type: String, required: true },
	phone: { type: Number, required: true },
});

export default mongoose.model<Profile>('profiles', ProfileSchema);
