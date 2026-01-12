import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user)

  return user ? children : <Navigate to="/login" replace />
}
