import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../services/api"

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get(`/books`)
      const found = res.data.find((b) => b._id === id)
      setBook(found)
    }

    fetchBook()
  }, [id])

  if (!book) {
    return <p className="text-center mt-10">Loading book...</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>

      <p className="mt-4">{book.description || "No description available."}</p>

      <p className="mt-4 font-bold text-xl">₹{book.price}</p>

      <button className="mt-6 bg-black text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  )
}
