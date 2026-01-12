import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
  const user = useSelector((state) => state.auth.user)

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />
  }

  return children
}
