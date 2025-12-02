import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Bookshop
        </Link>

        <ul className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
          <li>
            <Link to="/books" className="hover:text-indigo-600">
              Books
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-indigo-600">
              Categories
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-indigo-600">
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Account
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <i class="ri-close-line"></i> : <i class="ri-menu-3-line"></i>}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white shadow">
          <ul className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
            <li>
              <Link to="/books" onClick={() => setOpen(false)}>
                Books
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setOpen(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md inline-block"
                onClick={() => setOpen(false)}
              >
                Account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
