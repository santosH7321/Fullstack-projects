import { sendEmail } from "../helper/send_email.js";
import OTP from "../model/email.model.js";
import User from "../model/user.model.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        
        if(!email) {
            return res.status(400).json({
                message: "Please provide an email",
                status: false
            });
        }

        const user = await User.findOne({ email });
        
        if(user) {
            return res.status(404).json({
                message: "User already exists, please login",
                status: false
            });
        }

        const otp = otpGenerator.generate(6, { 
            upperCaseAlphabets: false,
            specialChars: false, 
            lowerCaseAlphabets: false,
            digits: true
        });

        try {
            await sendEmail(email, "Your OTP for Coding School", `<p>Your OTP for Coding School is: <b>${otp}</b></p>`);
            res.status(200).json({
                message: "OTP sent successfully",
                status: true,
                otp
            });
        }
        catch (error) {
            console.error("Error sending email:", error);
        }

        await OTP.create({ email, otp });

        return res.status(200).json({
            message: "OTP sent successfully",
            status: true
        });

    }
    catch (error) { 
        res.status(500).json({
            message: "Failed to send OTP",
            status: false
        });
    }
}

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirm_password, accountType, otp } = req.body;

        if(!firstName || !lastName || !email || !password || !confirm_password || !accountType || !otp) {
            return res.status(400).json({
                message: "Please provide all required fields",
                status: false
            });
        }

        if(password !== confirm_password) {
            return res.status(400).json({
                message: "Passwords do not match",
                status: false
            });
        }

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists, please login",
                status: false
            });
        }

        const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

        if(!otpRecord) {
            return res.status(400).json({
                message: "Otp not found, please request a new one",
                status: false
            });
        }

        if(otpRecord.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
                status: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await OTP.deleteOne({ _id: otpRecord._id });

        const user = await User.create({ firstName, lastName, email, password: hashedPassword, accountType });
        return res.status(201).json({
            message: "User registered successfully",
            status: true,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to register user",
            status: false
        });
    }
}  