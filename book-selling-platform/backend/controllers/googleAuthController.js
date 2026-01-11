import { OAuth2Client } from "google-auth-library"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

export const googleLogin = async (req, res) => {
  const { token } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const { name, email, sub } = ticket.getPayload()

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
      })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(401).json({ message: "Google authentication failed" })
  }
}
