import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    accountType: {
        type: String,
        required: true,
        enum: ["Student", "Instructor", "Admin"],
        default: "Student"
    },
    additionDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Date
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;