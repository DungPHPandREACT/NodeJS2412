import mongoose, { Document, Schema } from 'mongoose';

export interface Course extends Document {
	title: string;
	description: string;
	duration: number;
}

const CourseSchema: Schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	duration: { type: Number, required: true },
});

export default mongoose.model<Course>('course', CourseSchema);
