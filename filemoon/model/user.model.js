const {Schema, model} = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    fullname: {
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
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, {timestamps: true});

userSchema.pre('save', async function() {
    const count = await model("User").countDocuments({mobile: this.mobile})
    if(count > 0)
        throw new Error("Mobile number already exist")
})

userSchema.pre('save', async function() {
    const count = await model("User").countDocuments({email: this.email})
    if(count > 0)
        throw new Error("Email already exist")
})

userSchema.pre('save', async function() {
    const encryptedPassword = await bcrypt.hash(this.password.toString(), 12)
    this.password = encryptedPassword
})

const UserModel = model("User", userSchema);
module.exports = UserModel;