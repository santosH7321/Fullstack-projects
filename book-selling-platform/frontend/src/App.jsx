import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import BookDetails from "./pages/BookDetails"
import ProtectedRoute from "./components/ProtectedRoute"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import OrderSuccess from "./pages/OrderSuccess"
import MyOrders from "./pages/MyOrders"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminRoute from "./components/AdminRoute"
import AdminDashboard from "./pages/admin/AdminDashboard"
import AdminBooks from "./pages/admin/AdminBooks"
import AddEditBook from "./pages/admin/AddEditBook"




export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/books"
          element={
            <AdminRoute>
              <AdminBooks />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/books/:id"
          element={
            <AdminRoute>
              <AddEditBook />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/books/new"
          element={
            <AdminRoute>
              <AddEditBook />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

