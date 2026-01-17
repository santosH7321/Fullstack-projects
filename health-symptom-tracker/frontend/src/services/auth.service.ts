import api from "./api"

export const registerUser = (data: {
  name: string
  email: string
  password: string
}) => api.post("/auth/register", data)

export const loginUser = (data: {
  email: string
  password: string
}) => api.post("/auth/login", data)
