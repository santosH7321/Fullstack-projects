import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import {
  createOrder,
  createRazorpayOrder,
  verifyPayment,
} from "../services/payment"

export default function Checkout() {
  const { cartItems, totalAmount, clearCart } = useCart()
  const { user } = useAuth()

  const handlePay = async () => {
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

    const rpRes = await createRazorpayOrder(orderId, user.token)

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: rpRes.data.amount,
      currency: rpRes.data.currency,
      name: "Book Store",
      description: "Book Purchase",
      order_id: rpRes.data.razorpayOrderId,
      handler: async function (response) {
        await verifyPayment(
          {
            ...response,
            orderId,
          },
          user.token
        )
        clearCart()

        window.location.href = "/success"
      },
      theme: { color: "#000000" },
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <p className="mb-4">
        Total Amount: <b>₹{totalAmount}</b>
      </p>

      <button
        onClick={handlePay}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Pay Now
      </button>
    </div>
  )
}
