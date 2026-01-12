import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  removeFromCart,
  updateQty,
  clearCart,
} from "../redux/slices/cartSlice"

import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../services/payment"

export default function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector((state) => state.cart.cartItems)
  const user = useSelector((state) => state.auth.user)

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  const handlePay = async () => {
    try {
      const orderRes = await createOrder(
        {
          orderItems: cartItems.map((item) => ({
            book: item._id,
            qty: item.qty,
            price: item.price,
          })),
          totalAmount,
        },
        user.token
      )

      const orderId = orderRes.data._id
      const rpRes = await createRazorpayOrder(
        orderId,
        user.token
      )
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rpRes.data.amount,
        currency: rpRes.data.currency,
        name: "Book Store",
        description: "Book Purchase",
        order_id: rpRes.data.razorpayOrderId,

        handler: async function (response) {
          await verifyPayment(
            { ...response, orderId },
            user.token
          )
          dispatch(clearCart())
          navigate("/success")
        },

        theme: { color: "#000000" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (err) {
      console.error("Payment failed", err)
    }
  }
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center">
        <p className="text-4xl mb-4">🛒</p>
        <h2 className="text-xl font-semibold">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-1">
          Add some books to continue.
        </p>

        <Link
          to="/"
          className="mt-6 rounded-lg bg-black px-6 py-2.5
                     text-white font-medium hover:bg-gray-900 transition"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 px-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold">Your Cart</h2>

        <Link
          to="/"
          className="rounded-lg border px-4 py-2 text-sm
                     hover:bg-gray-100 transition"
        >
          ← Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-2xl border bg-white shadow-sm">
          <div className="divide-y">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row
                           sm:items-center sm:justify-between
                           gap-4 p-5"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="flex items-center rounded-lg border overflow-hidden">
                    <button
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                      onClick={() =>
                        dispatch(
                          updateQty({
                            id: item._id,
                            qty: item.qty - 1,
                          })
                        )
                      }
                      disabled={item.qty === 1}
                    >
                      -
                    </button>

                    <span className="px-4 py-1.5 text-sm font-semibold">
                      {item.qty}
                    </span>

                    <button
                      className="px-3 py-1.5 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        dispatch(
                          updateQty({
                            id: item._id,
                            qty: item.qty + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="min-w-[90px] text-right font-semibold">
                    ₹{item.price * item.qty}
                  </div>

                  <button
                    onClick={() =>
                      dispatch(removeFromCart(item._id))
                    }
                    className="text-sm text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-white shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Delivery</span>
            <span className="text-green-600">Free</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={handlePay}
            className="mt-6 w-full rounded-xl bg-black px-6 py-3
                       text-white font-semibold
                       hover:bg-gray-900 transition cursor-pointer"
          >
            Pay Securely
          </button>

          <p className="mt-3 text-xs text-gray-500 text-center">
            🔒 Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  )
}
