import express from "express";
import { changePassword, login, reset_password, reset_password_token, sendOtp, signup } from "../controller/authController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp", sendOtp);
AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/change_password",authMiddleware, changePassword);
AuthRouter.post("/reset_password_token",authMiddleware, reset_password_token);
AuthRouter.post("/reset_password", reset_password);

AuthRouter.post("/upload", async (req, res) => {
    try {
        const file = req.files.thumbnail;
        if(!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const uploadFile = await uploadToCloudinary(file, 'testing');
        if(!uploadFile) {
            return res.status(500).json({ message: 'Error uploading file to Cloudinary' });
        }

        res.status(200).json({ 
            message: 'File uploaded successfully',
            success: true,
            url: uploadFile.secure_url
        });
    }
    catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
})

export default AuthRouter; 