import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    accountType: {
        type: String,
        enum: ["Student", "Instructor", "Admin"]
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true
    }
    
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session; 