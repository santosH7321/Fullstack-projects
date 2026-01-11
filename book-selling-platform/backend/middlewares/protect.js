import jwt from "jsonwebtoken"
import User from "../models/User.js"

const protect = async (req, res, next) => {
  console.log("HEADERS RECEIVED:", req.headers)

  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select("-password")
      return next()
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" })
    }
  }

  return res.status(401).json({ message: "No token provided" })
}

export default protect
