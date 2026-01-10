import { useState } from "react"
import UrlForm from "../components/UrlForm"
import ImageGrid from "../components/ImageGrid"
import { fetchImages } from "../services/api"

const Home = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleFetch = async (url) => {
    setLoading(true)
    setError("")
    setImages([])

    try {
      const data = await fetchImages(url)
      setImages(data)
    } catch (err) {
      setError("Failed to fetch images. Please try again.")
    } finally {
      setLoading(false)
    }
  }

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

        <ImageGrid images={images} />
      </div>
    </div>
  )
}

export default Home
