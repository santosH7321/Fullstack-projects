import { Link } from "react-router-dom"
import { CheckCircle } from "lucide-react"

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl text-center">

        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Payment Successful
        </h1>

        <p className="mt-2 text-gray-600">
          Thank you for your purchase!  
          Your order has been placed successfully.
        </p>

        <div className="mt-6 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700">
          📦 You can track your order anytime from  
          <span className="font-medium"> My Orders</span>.
        </div>

        <div className="mt-8 space-y-3">
          <Link
            to="/"
            className="block w-full rounded-xl bg-black px-6 py-3
                       text-white font-semibold
                       hover:bg-gray-900 transition"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="block w-full rounded-xl border px-6 py-3
                       font-semibold text-gray-700
                       hover:bg-gray-100 transition"
          >
            View My Orders
          </Link>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          🔒 Payment processed securely • Powered by Razorpay
        </p>
      </div>
    </div>
  )
}
