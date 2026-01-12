import { Link } from "react-router-dom"

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="space-x-4">
        <Link
          to="/admin/books"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Manage Books
        </Link>
      </div>
    </div>
  )
}
