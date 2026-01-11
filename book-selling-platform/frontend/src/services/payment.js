import api from "./api"

export const createOrder = (payload, token) =>
  api.post("/orders", payload, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const createRazorpayOrder = (orderId, token) =>
  api.post("/payment/create", { orderId }, {
    headers: { Authorization: `Bearer ${token}` },
  })

export const verifyPayment = (payload, token) =>
  api.post("/payment/verify", payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
