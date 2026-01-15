import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters long"],
        select: false
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/demo/image/upload/v1674576474/avatar.png",
    },
    phone: {
        type: String,
        default: ""
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(14);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const User = mongoose.model("User", userSchema);
export default User;