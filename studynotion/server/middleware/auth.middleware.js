import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers("Authorization")?.replace("Bearer ", "");
        
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                status: false
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid token",
                status: false
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(500).json({
            message: "Authentication failed",
            status: false
        });
    }
}