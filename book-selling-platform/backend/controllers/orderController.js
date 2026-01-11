import Order from "../models/Order.js"

export const createOrder = async (req, res) => {
  const { orderItems, totalAmount } = req.body

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" })
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalAmount
  })

  res.status(201).json(order)
}

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("orderItems.book", "title author")

  res.json(orders)
}

export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email")
    .populate("orderItems.book", "title")

  res.json(orders)
}
