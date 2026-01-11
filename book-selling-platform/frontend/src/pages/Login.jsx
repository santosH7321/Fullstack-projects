import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"

import api from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" })
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await api.post("/auth/login", form)
    login(res.data)
    navigate("/")
  }


  const handleGoogleLogin = async (credentialResponse) => {
    const res = await api.post("/auth/google", {
      token: credentialResponse.credential,
    })

    login(res.data)
    navigate("/")
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5">
      <h2 className="text-2xl font-bold">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full border p-2"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="w-full border p-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-black text-white w-full py-2">
          Login
        </button>
      </form>

      <div className="text-center text-gray-500">OR</div>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => console.log("Google Login Failed")}
      />
    </div>
  )
}
