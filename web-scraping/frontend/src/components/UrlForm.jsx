import { useState } from "react"

const UrlForm = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!url.trim()) return
    onSubmit(url)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="url"
        placeholder="Enter website URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
      >
        {loading ? "Fetching..." : "Fetch"}
      </button>
    </form>
  )
}

export default UrlForm
