import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  removeFromCart,
  updateQty,
} from "../redux/slices/cartSlice"

export default function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

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
            <p className="text-sm text-gray-600">
              ₹{item.price}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="px-2 border"
              onClick={() =>
                dispatch(
                  updateQty({ id: item._id, qty: item.qty - 1 })
                )
              }
              disabled={item.qty === 1}
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              className="px-2 border"
              onClick={() =>
                dispatch(
                  updateQty({ id: item._id, qty: item.qty + 1 })
                )
              }
            >
              +
            </button>

            <button
              className="ml-3 text-red-500"
              onClick={() =>
                dispatch(removeFromCart(item._id))
              }
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">
          Total: ₹{totalAmount}
        </p>

        <Link
          to="/checkout"
          className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}
