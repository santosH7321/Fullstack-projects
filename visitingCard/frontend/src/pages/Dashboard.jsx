import { useEffect, useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const [cards, setCards] = useState([])

  useEffect(() => {
    api.get("/cards").then(res => setCards(res.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">My Cards</h1>

      <div className="grid grid-cols-3 gap-6">
        {cards.map(card => (
          <Link
            key={card._id}
            to={`/editor/${card._id}`}
            className="bg-white rounded shadow p-4 hover:shadow-lg"
          >
            <div className="h-32 bg-gray-300 rounded mb-2"></div>
            <p className="text-sm text-gray-600">
              Created: {new Date(card.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
