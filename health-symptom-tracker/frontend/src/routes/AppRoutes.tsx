import { Routes, Route, Navigate } from "react-router-dom"
import Home from "../pages/Home"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Register from "../pages/Register"

export default function AppRoutes() {
  const token = localStorage.getItem("token")

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/dashboard" /> : <Home />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  )
}
