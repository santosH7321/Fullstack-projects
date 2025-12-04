import User from "../models/user.schema.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        res.status(200).json({ message: "Signin successful!" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}