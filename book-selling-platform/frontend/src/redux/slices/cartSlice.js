import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const exist = state.cartItems.find((i) => i._id === item._id)

      if (exist) {
        exist.qty += 1
      } else {
        state.cartItems.push({ ...item, qty: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      )
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload
      const item = state.cartItems.find((i) => i._id === id)
      if (item && qty > 0) item.qty = qty
    },
    clearCart: (state) => {
      state.cartItems = []
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQty,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
