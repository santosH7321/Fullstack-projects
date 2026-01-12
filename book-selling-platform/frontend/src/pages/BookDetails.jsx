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
    return <p className="text-center mt-16 text-gray-500">Loading book...</p>
  }

  if (!book) {
    return <p className="text-center mt-16">Book not found</p>
  }

  return (
    <div className="max-w-5xl mx-auto min-h-screen mt-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow">

        {/* ================= Image Section ================= */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm aspect-[3/4] overflow-hidden rounded-xl bg-gray-100">
            <img
              src={book.coverImage || "https://via.placeholder.com/400x600"}
              alt={book.title}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* ================= Content Section ================= */}
        <div className="flex flex-col">
          {/* Title & Author */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {book.title}
            </h1>
            <p className="mt-1 text-gray-500">
              by {book.author}
            </p>
          </div>

          {/* Price */}
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-bold text-black">
              ₹{book.discountPrice || book.price}
            </span>

            {book.discountPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₹{book.price}
              </span>
            )}
          </div>

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap gap-2">
            {book.category && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                {book.category}
              </span>
            )}
            {book.isAvailable && (
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                In Stock
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900">
              Description
            </h3>
            <p className="mt-2 text-gray-700 leading-relaxed">
              {book.description || "No description available."}
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAdd}
              className="flex-1 rounded-xl bg-black px-6 py-3
                         text-white font-semibold
                         hover:bg-gray-900 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => navigate("/")}
              className="rounded-xl border px-6 py-3
                         font-semibold text-gray-700
                         hover:bg-gray-100 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
