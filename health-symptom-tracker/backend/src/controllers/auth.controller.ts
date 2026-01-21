import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
import { registerSchema, loginSchema } from "../validators/auth.validator"


const generateToken = (id: string) => {
  const secret = process.env["JWT_SECRET"]
  if (!secret) {
    throw new Error("JWT_SECRET is not defined")
  }

  return jwt.sign({ id }, secret, {
    expiresIn: "7d",
  })
}

export const registerUser = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues)
  }
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ message: "User already exists" })
  }

  const user = await User.create({ name, email, password })

  return res.status(201).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  })
}

export const loginUser = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json(parsed.error.issues)
  }
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id.toString()),
  })
}
