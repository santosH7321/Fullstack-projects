import express from "express";
import { sendOtp, signup } from "../controller/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp", sendOtp);
AuthRouter.post("/signup", signup);



export default AuthRouter; 