import { Navigate } from "react-router-dom"
import type { JSX } from "react/jsx-dev-runtime"

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" />
}
