import { useCart } from "../context/CartContext"
import CartItem from "../components/CartItem"

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, totalAmount } = useCart()

  if (cartItems.length === 0) {
    return <p className="text-center mt-10">Cart is empty 🛒</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          onRemove={removeFromCart}
          onUpdate={updateQty}
        />
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold">
          Total: ₹{totalAmount}
        </p>

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}
