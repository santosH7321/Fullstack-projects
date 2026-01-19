import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AddSymptom from "./pages/AddSymptom"
import History from "./pages/History"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AppRoutes from "./routes/AppRoutes"

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-symptom"
          element={
            <ProtectedRoute>
              <AddSymptom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
