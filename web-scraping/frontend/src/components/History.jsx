const History = ({ history, onDelete, onClear }) => {
  if (!history || history.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No search history yet
      </p>
    )
  }

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Recent Searches
        </h2>

        <button
          onClick={onClear}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded"
        >
          Clear All
        </button>
      </div>

      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center p-3 border rounded bg-white text-sm"
          >
            <div>
              🔗 {item.url}
              <div className="text-xs text-gray-400">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => onDelete(item._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
