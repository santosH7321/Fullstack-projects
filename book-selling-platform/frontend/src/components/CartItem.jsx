export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">₹{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="px-2 border"
          onClick={() => onUpdate(item._id, item.qty - 1)}
          disabled={item.qty === 1}
        >
          -
        </button>

        <span>{item.qty}</span>

        <button
          className="px-2 border"
          onClick={() => onUpdate(item._id, item.qty + 1)}
        >
          +
        </button>

        <button
          className="ml-3 text-red-500"
          onClick={() => onRemove(item._id)}
        >
          Remove
        </button>
      </div>
    </div>
  )
}
