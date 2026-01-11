import { useEffect, useState } from "react"
import api from "../services/api"
import BookCard from "../components/BookCard"

export default function Home() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get("/books")
      setBooks(res.data)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading books...</p>
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Available Books 📚
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  )
}
