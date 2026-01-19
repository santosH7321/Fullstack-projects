import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setDrawerOpen(false)
    navigate("/login")
  }

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="text-2xl font-bold text-emerald-600"
          >
            HealthTrack
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/add-symptom">Add Symptom</NavLink>
                <NavLink to="/history">History</NavLink>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/register"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden text-2xl text-gray-700"
          >
            <FiMenu />
          </button>
        </div>
      </nav>

      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex items-center justify-end px-6 py-5 border-b">
          <button
            onClick={() => setDrawerOpen(false)}
            className="text-2xl"
          >
            <FiX />
          </button>
        </div>

        <div className="px-6 py-6 space-y-4">
          {isLoggedIn ? (
            <>
              <DrawerLink to="/dashboard" close={() => setDrawerOpen(false)}>
                Dashboard
              </DrawerLink>
              <DrawerLink to="/add-symptom" close={() => setDrawerOpen(false)}>
                Add Symptom
              </DrawerLink>
              <DrawerLink to="/history" close={() => setDrawerOpen(false)}>
                History
              </DrawerLink>

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <DrawerLink to="/login" close={() => setDrawerOpen(false)}>
                Login
              </DrawerLink>
              <Link
                to="/register"
                onClick={() => setDrawerOpen(false)}
                className="block bg-emerald-600 text-white py-2 rounded-xl text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}


function NavLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      className="text-gray-600 hover:text-emerald-600 transition"
    >
      {children}
    </Link>
  )
}

function DrawerLink({
  to,
  close,
  children,
}: {
  to: string
  close: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      to={to}
      onClick={close}
      className="block text-gray-700 hover:text-emerald-600 transition"
    >
      {children}
    </Link>
  )
}
