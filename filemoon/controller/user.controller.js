const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.status(201).json({
            message: "Signup successful !",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email});
    if(!user)
        return res.status(404).json({message: "User don't exist"});
    const isLogin = await bcrypt.compare(password, user.password);
    if(!isLogin)
        return res.status(401).json({message: "Invalid Password"});
    res.status(200).json({
        message: "Login success ✅",
    });
}

module.exports = {
    signup,
    login
}