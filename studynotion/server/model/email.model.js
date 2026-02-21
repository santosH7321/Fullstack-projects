import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    otp: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
        expires: 300 
    }
}, { timestamps: true });

const OTP = mongoose.model("Otp", otpSchema);

export default OTP;