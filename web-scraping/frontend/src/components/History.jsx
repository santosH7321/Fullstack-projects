const History = ({ history }) => {
  if (!history.length) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No search history yet
      </p>
    )
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">
        Recent Searches
      </h2>

      <ul className="space-y-2">
        {history.map((item) => (
          <li
            key={item._id}
            className="p-3 border rounded text-sm bg-white"
          >
            🔗 {item.url}
            <span className="block text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default History
