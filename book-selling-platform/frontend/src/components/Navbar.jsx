import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { IoCartOutline } from "react-icons/io5"

import { logout } from "../redux/slices/authSlice"

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.user)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <div>
            <p className="text-lg font-bold text-white leading-none">
              BookStore
            </p>
            <p className="text-xs text-gray-400">
              Read. Learn. Grow.
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-300">

          {user && (
            <>
              <Link
                to="/orders"
                className="hover:text-white transition"
              >
                My Orders
              </Link>

              <Link
                to="/cart"
                className="relative hover:text-white transition"
              >
                <IoCartOutline className="text-xl" />

                {cartItems.length > 0 && (
                  <span
                    className="absolute -top-2 -right-3 min-w-[18px] h-[18px]
                               bg-red-600 text-white text-xs rounded-full
                               flex items-center justify-center animate-pulse"
                  >
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <div className="h-6 w-px bg-white/20" />

              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-gray-400">
                  Hi, {user?.name || "User"}
                </span>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600/90 px-4 py-1.5 text-white
                             hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-white px-4 py-1.5 text-black
                           hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
