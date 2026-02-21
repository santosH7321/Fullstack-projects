import express from "express";
import { login, sendOtp, signup } from "../controller/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp", sendOtp);
AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);



export default AuthRouter; 