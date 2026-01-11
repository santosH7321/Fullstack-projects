import { useCart } from "../context/CartContext"
import { Link } from "react-router-dom"

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalAmount } = useCart()

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Cart is empty 🛒</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b py-3"
        >
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-600">₹{item.price}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-2 border"
              onClick={() => updateQty(item._id, item.qty - 1)}
              disabled={item.qty === 1}
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              className="px-2 border"
              onClick={() => updateQty(item._id, item.qty + 1)}
            >
              +
            </button>

            <button
              className="ml-3 text-red-500"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">Total: ₹{totalAmount}</p>

        <Link
          to="/checkout"
          className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
