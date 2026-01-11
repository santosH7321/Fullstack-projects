import { createContext, useContext, useState } from "react"

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (book) => {
    const exist = cartItems.find((item) => item._id === book._id)

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === book._id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...book, qty: 1 }])
    }
  }

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id))
  }

  const updateQty = (id, qty) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    )
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
