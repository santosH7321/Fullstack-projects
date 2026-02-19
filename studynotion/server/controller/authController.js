

export const sendOtp = async (req, res) => {
    try {
        
    }
    catch (error) { 
        res.status(500).json({
            message: "Failed to send OTP",
            status: false
        });
    }
}