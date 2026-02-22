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



export default AuthRouter; 