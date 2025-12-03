const UserModel = require("../model/user.model");

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

module.exports = {
    signup
}