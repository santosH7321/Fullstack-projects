import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"

import api from "../services/api"

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await api.get("/books")
        const foundBook = res.data.find((b) => b._id === id)
        setBook(foundBook)
      } catch (err) {
        console.error("Failed to fetch book", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleAdd = () => {
    dispatch(addToCart(book))
    navigate("/cart")
  }

  if (loading) {
    return <p className="text-center mt-10">Loading book...</p>
  }

  if (!book) {
    return <p className="text-center mt-10">Book not found</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl border bg-white shadow">
      <h2 className="text-2xl font-bold text-gray-900">
        {book.title}
      </h2>

      <p className="text-gray-600 mt-1">
        by {book.author}
      </p>

      <p className="mt-4 text-gray-700 leading-relaxed">
        {book.description || "No description available."}
      </p>

      <p className="mt-6 font-bold text-xl text-black">
        ₹{book.price}
      </p>

      <button
        onClick={handleAdd}
        className="mt-6 w-full rounded-lg bg-black px-4 py-2.5
                   text-white font-semibold hover:bg-gray-900 transition"
      >
        Add to Cart
      </button>
    </div>
  )
}
