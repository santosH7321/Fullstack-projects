import { sendEmail } from "../helper/send_email.js";
import OTP from "../model/email.model.js";
import User from "../model/user.model.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Session from "../model/session.model.js";
import { access } from "fs";


function hash(value) {
    return crypto.createHash("sha256").update(value).digest("hex");
}

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

export const login = async (req, res) => {
    try {
        // fetch email and password from request body
        const { email, password } = req.body;

        // validate email and password
        if(!email || !password) {
            return res.status(400).json({
                message: "Invalid user",
                status: false
            });
        }

        // find user by email
        const user = await User.findOne({ email });

        // if user not found, return error
        if(!user) {
            return res.status(404).json({
                message: "User not found, please signup",
                status: false
            });
        }

        // compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if password is invalid, return error
        if(!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid password",
                status: false
            });
        }

        // generate access token
        const accessToken = jwt.sign(
            {   
                email: user.email,
                id: user._id,
                accountType: user.accountType
             },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "15m" }
        );

        // generate refresh token
        const refreshToken = crypto.randomBytes(40).toString("hex");

        // save refresh token in database
        await Session.create({
            userId: user._id,
            accountType: user.accountType,
            refreshToken: hash(refreshToken),
            email: user.email,
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })

        // send refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });

        // return access token and user details
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            accessToken
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to login user",
            status: false
        });
    }
}

// rotate refresh token
export const rotateRefreshToken = async (req, res) => {
    try {
        // fetch refresh token from cookies
        const token  = req.cookies.refreshToken;
        // validation
        if(!token) {
            return res.status(400).json({
                message: "Token is missing in cookies",
                status: false
            });
        }
        // find session in database
        const session = await Session.findOne({ refreshToken: hash(token) });
        // validation isRefreshToken is expired or not
        if(!session || session.expireAt < new Date()) {
            return res.status(400).json({
                message: "Session expired",
                status: false
            });
        }
         // delete session
        await Session.deleteOne({ _id: session._id });
        // rotate refresh token
        
        const accessToken = jwt.sign(
            {   
                email: session.email,
                id: session.userId,
                accountType: session.accountType
             },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: "15m" }
        );
        const newRefreshToken = crypto.randomBytes(40).toString("hex");
        // save new refresh token in database
        await Session.create({
            userId: session.userId,
            accountType: session.accountType,
            refreshToken: hash(newRefreshToken),
            email: session.email,
            expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })
        // send refresh token in cookies
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        });
        // return access token in response
        return res.status(200).json({
            success: true,
            message: "Refresh token rotated successfully",
            accessToken
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to rotate refresh token",
            status: false
        });
    }
}

// change password
export const changePassword = async (req, res) => {
    try {
        const { email, oldPassword, newPassword, confirmNewPassword } = req.body;

        const userId = req.user.id;

        if(!userId || !email || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                message: "Please provide all required fields",
                status: false
            });
        }

        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                message: "New passwords do not match",
                status: false
            });
        }

        const user = await User.findOne({ _id: userId });

        if(!user) {
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if(!isOldPasswordValid) {
            return res.status(400).json({
                message: "Invalid old password",
                status: false
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedNewPassword;
        await user.save();

        try {
            await sendEmail(user.email,
                 "Update Password",
                `Password is updated for your account ${user.email}`);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }

        return res.status(200).json({
            message: "Password changed successfully",
            status: true
        });
    }
    catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const reset_password_token = async (req, res) => {
    try{
        const { email } = req.body;
        
        if(!email) {
            return res.status(400).json({
                message: "Please provide email",
                status: false
            });
        }

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                message: "User not found",
                status: false
            });
        }

        const token = crypto.randomBytes(20).toString("hex");

        user.reset_password_token = token;
        user.reset_password_expires = Date.now() + 600000; 
        await user.save();

        const resetLink = `http://localhost:3000/reset_password?token=${token}`;
        
        try {
            await sendEmail(user.email, "Password Reset Request", `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 10 minutes.</p>`);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }

        return res.status(200).json({
            message: "Password reset link sent to email",
            status: true
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const reset_password = async (req, res) => {
    try {
        const { token, newPassword, confirmNewPassword } = req.body;
        
        if(!token || !newPassword || !confirmNewPassword) {
            return res.status(400).json({
                message: "Please provide all required fields",
                status: false
            });
        }
        
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                message: "New passwords do not match",
                status: false 
            });
        }

        const user = await User.findOne({ 
            reset_password_token: token, 
            reset_password_expires: { $gt: Date.now() } 
        });

        if(!user) {
            return res.status(400).json({
                message: "Invalid or expired token",
                status: false
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedNewPassword;
        user.reset_password_token = undefined;
        user.reset_password_expires = undefined;
        await user.save();

        return res.status(200).json({
            message: "Password reset successfully, please login with new password",
            status: true
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}