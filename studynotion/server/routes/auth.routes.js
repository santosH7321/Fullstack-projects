import express from "express";
import { changePassword, login, sendOtp, signup } from "../controller/authController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp", sendOtp);
AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/change_password",authMiddleware, changePassword);



export default AuthRouter; 