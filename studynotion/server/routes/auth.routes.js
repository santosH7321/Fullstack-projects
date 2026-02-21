import express from "express";
import { sendOtp } from "../controller/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/otp", sendOtp);


export default AuthRouter; 