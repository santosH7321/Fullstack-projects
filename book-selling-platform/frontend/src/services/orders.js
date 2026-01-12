import api from "./api"

export const getMyOrders = (token) =>
  api.get("/orders/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
