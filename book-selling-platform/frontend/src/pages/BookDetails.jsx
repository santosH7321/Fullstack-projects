import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../services/api"
import { useCart } from "../context/CartContext"

export default function BookDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchBook = async () => {
      const res = await api.get("/books")
      const found = res.data.find((b) => b._id === id)
      setBook(found)
    }

    fetchBook()
  }, [id])

  const handleAdd = () => {
    console.log("ADDING BOOK:", book)
    addToCart(book)
    navigate("/cart") 
  }

  if (!book) {
    return <p className="text-center mt-10">Loading book...</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>

      <p className="mt-4">
        {book.description || "No description available."}
      </p>

      <p className="mt-4 font-bold text-xl">₹{book.price}</p>

      <button
        onClick={handleAdd}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  )
}
