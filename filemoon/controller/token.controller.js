const jwt = require("jsonwebtoken")

const verifyToken = async (req, res) => {
    try {
        const payload = await jwt.verify(req.body.token, process.env.JWT_SECRET_KEY);
        res.status(200).json({
            message: "Token Verified",
            payload: payload
        });
    } catch (err) {
        res.status(401).json({
            message: "Invalid Token"
        });
    }
}

module.exports = {
    verifyToken
}