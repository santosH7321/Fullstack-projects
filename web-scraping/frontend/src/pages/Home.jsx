import { useState, useEffect } from "react"
import UrlForm from "../components/UrlForm"
import ImageGrid from "../components/ImageGrid"
import Loader from "../components/Loader"
import History from "../components/History"
import { toast } from "react-toastify"

import {
  fetchImages,
  fetchHistory,
  deleteHistoryItem,
  clearHistory
} from "../services/api"


const Home = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [history, setHistory] = useState([])

  const itemsPerPage = 12


  const handleFetch = async (url) => {
    setLoading(true)
    setError("")
    setImages([])
    setPage(1)

    try {
        const data = await fetchImages(url)
        setImages(data)

        toast.success(`✅ ${data.length} images fetched`)
    } catch (err) {
        setError("Failed to fetch images. Please try again.")
        toast.error("❌ Failed to fetch images")
    } finally {
        setLoading(false)
    }
}



        useEffect(() => {
        const loadHistory = async () => {
            const data = await fetchHistory()
            setHistory(data)
        }
        loadHistory()
        }, [])

    const handleDelete = async (id) => {
        await deleteHistoryItem(id)
        setHistory(prev => prev.filter(item => item._id !== id))

        toast.info("🗑️ History item deleted")
        }


    const handleClear = async () => {
        await clearHistory()
        setHistory([])
        setImages([])

        toast.warn("⚠️ All history cleared")
    }


    const paginatedImages = images.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    )


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Image Scraper Tool
        </h1>

        <UrlForm onSubmit={handleFetch} loading={loading} />

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}

        {loading ? <Loader /> : <ImageGrid images={paginatedImages} />}

        {images.length > itemsPerPage && (
            <div className="flex justify-center gap-4 mt-6">
                <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
                >
                Prev
                </button>

                <button
                disabled={page * itemsPerPage >= images.length}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border rounded disabled:opacity-50"
                >
                Next
                </button>
            </div>
        )}


      </div>
      <History
        history={history}
        onDelete={handleDelete}
        onClear={handleClear}
        />


    </div>
  )
}

export default Home
