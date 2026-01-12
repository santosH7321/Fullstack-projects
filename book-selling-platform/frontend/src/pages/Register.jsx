import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from "@react-oauth/google"
import { toast } from "react-toastify"

import api from "../services/api"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  // ✅ Normal Register → redirect to /login
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await api.post("/auth/register", form)

      toast.success("Account created successfully! Please login.")
      navigate("/login")
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Registration failed"
      )
    } finally {
      setLoading(false)
    }
  }

  // ✅ Google Register/Login → auto login → redirect to /
  const handleGoogleRegister = async (credentialResponse) => {
    try {
      const res = await api.post("/auth/google", {
        token: credentialResponse.credential,
      })

      login(res.data)
      toast.success("Logged in with Google")
      navigate("/")
    } catch {
      toast.error("Google authentication failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 backdrop-blur shadow-2xl p-8 space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h2>
          <p className="text-sm text-gray-500">
            Join us and start your journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Santosh Kumar"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white
                       hover:bg-gray-900 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Google Auth */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleRegister}
            onError={() => toast.error("Google Login Failed")}
            shape="pill"
            size="large"
          />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-black hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
}
