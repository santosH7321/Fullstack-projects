import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, deleteBook } from "../../redux/slices/adminSlice"
import { Link } from "react-router-dom"

export default function AdminBooks() {
  const dispatch = useDispatch()
  const { books, loading } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(fetchBooks())
  }, [dispatch])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Books</h2>
        <Link
          to="/admin/books/new"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </Link>
      </div>

      {books.map((book) => (
        <div
          key={book._id}
          className="flex justify-between border p-3 mb-2"
        >
          <span>{book.title}</span>

          <div className="space-x-2">
            <Link
              to={`/admin/books/${book._id}`}
              className="text-blue-600"
            >
              Edit
            </Link>

            <button
              onClick={() => dispatch(deleteBook(book._id))}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
