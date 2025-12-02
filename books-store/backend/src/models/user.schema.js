import { model, Schema } from "mongoose";

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    }
}, { timestamps: true });

const user = model("User", UserSchema);
export default user;