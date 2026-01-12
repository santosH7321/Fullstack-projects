import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { getMyOrders } from "../services/orders"

export default function MyOrders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders(user.token)
        setOrders(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>
  }

  if (orders.length === 0) {
    return <p className="text-center mt-10">No orders found 📦</p>
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded p-4 mb-6 shadow"
        >
          <div className="flex justify-between mb-2">
            <span className="font-semibold">
              Order ID: {order._id.slice(-6)}
            </span>
            <span
              className={`font-bold ${
                order.paymentStatus === "paid"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {order.paymentStatus.toUpperCase()}
            </span>
          </div>

          <p className="text-sm text-gray-600 mb-3">
            Ordered on: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          {order.orderItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2"
            >
              <span>
                {item.book?.title} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <p className="text-right font-bold mt-3">
            Total: ₹{order.totalAmount}
          </p>
        </div>
      ))}
    </div>
  )
}
