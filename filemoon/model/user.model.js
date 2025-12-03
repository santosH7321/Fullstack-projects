const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
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
        minLength: 6
    }
}, {timestamps: true});

const UserModel = model("User", userSchema);
export default UserModel;