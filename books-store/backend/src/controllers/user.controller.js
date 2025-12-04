import User from "../models/user.schema.js";

export const signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        res.status(201).json({ message: "Signup successful!" });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}