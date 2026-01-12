import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { cartItems } = useCart()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        📚 BookStore
      </Link>

      <div className="flex items-center gap-6">
        {user && (
          <>
            <Link to="/orders" className="hover:underline">
              My Orders
            </Link>

            <Link to="/cart" className="relative hover:underline">
              Cart
              {cartItems.length > 0 && (
                <span className="ml-1 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
