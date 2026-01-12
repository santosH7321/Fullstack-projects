import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import adminReducer from "./slices/adminSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    admin: adminReducer,
  },
})
