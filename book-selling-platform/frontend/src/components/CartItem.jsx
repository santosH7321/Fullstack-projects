export default function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                 gap-4 border-b py-4 transition hover:bg-gray-50"
    >
      <div className="flex-1">
        <h3 className="text-base font-semibold text-gray-900">
          {item.title}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          ₹{item.price} × {item.qty}
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="flex items-center rounded-lg border overflow-hidden">
          <button
            className="px-3 py-1.5 text-sm font-medium text-gray-700
                       hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onUpdate(item._id, item.qty - 1)}
            disabled={item.qty === 1}
          >
            -
          </button>

          <span className="px-4 py-1.5 text-sm font-semibold text-gray-900">
            {item.qty}
          </span>

          <button
            className="px-3 py-1.5 text-sm font-medium text-gray-700
                       hover:bg-gray-100"
            onClick={() => onUpdate(item._id, item.qty + 1)}
          >
            +
          </button>
        </div>

        <div className="min-w-[80px] text-right font-semibold text-gray-900">
          ₹{item.price * item.qty}
        </div>

        <button
          onClick={() => onRemove(item._id)}
          className="text-sm font-medium text-red-500
                     hover:text-red-600 hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
