import { sendEmail } from "../helper/send_email.js";
import OTP from "../model/email.model.js";
import User from "../model/user.model.js";
import otpGenerator from "otp-generator";

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

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if(!email || !otp) {
            return res.status(400).json({
                message: "Please provide both email and OTP",
                status: false
            });
        }

        const otpRecord = await OTP.findOne({ email, otp });

        if(!otpRecord) {
            return res.status(400).json({
                message: "Invalid OTP",
                status: false
            });
        }

        await OTP.deleteOne({ _id: otpRecord._id });

        return res.status(200).json({
            message: "OTP verified successfully",
            status: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to verify OTP",
            status: false
        });
    }
}