import mongoose, {Document, Schema} from "mongoose";

interface IUser extends Document{
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    googleId: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    password: { type: String, required: true},
})

const User = mongoose.model<IUser>('User', userSchema);

export default User;