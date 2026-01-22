import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

export interface AuthRequest extends Request {
  user?: any
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
    
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]
      const decoded = jwt.verify(token as string, process.env["JWT_SECRET"]!) as any

      req.user = await User.findById(decoded.id).select("-password")
      if (!req.user) {
        return res.status(401).json({ message: "User not found" })
      }

      return next()
    } catch (error) {
      return res.status(401).json({ message: "Not authorized" })
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" })
  }
}
