import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },
    profession: {
        type: String
    },
    about: {
        type: String,
        maxLength: 500
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {timestamps: true});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;