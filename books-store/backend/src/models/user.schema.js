import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.pre('save', async function() {
    const count = await model("User").countDocuments({email: this.email})
    if(count > 0)
        throw new Error("Email already exist")
})

UserSchema.pre('save', async function() {
    const encryptedPassword = await bcrypt.hash(this.password.toString(), 12)
    this.password = encryptedPassword
})

const User = model("User", UserSchema);
export default User;