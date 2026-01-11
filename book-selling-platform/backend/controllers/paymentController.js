import razorpay from "../config/razorpay.js"
import crypto from "crypto"
import Order from "../models/Order.js"

export const createPaymentOrder = async (req, res) => {
  const { orderId } = req.body

  const order = await Order.findById(orderId)
  if (!order) {
    return res.status(404).json({ message: "Order not found" })
  }

  const options = {
    amount: order.totalAmount * 100, 
    currency: "INR",
    receipt: `receipt_${order._id}`,
  }

  const razorpayOrder = await razorpay.orders.create(options)

  res.json({
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  })
}

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body

  const body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex")

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" })
  }

  const order = await Order.findById(orderId)
  order.paymentStatus = "paid"
  order.orderStatus = "confirmed"
  await order.save()

  res.json({ message: "Payment verified successfully" })
}
