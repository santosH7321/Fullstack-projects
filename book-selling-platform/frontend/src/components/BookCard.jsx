import { Link } from "react-router-dom"

export default function BookCard({ book }) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>

      <p className="mt-2 font-bold">₹{book.price}</p>

      <Link
        to={`/books/${book._id}`}
        className="inline-block mt-3 text-sm text-blue-600"
      >
        View Details →
      </Link>
    </div>
  )
}
