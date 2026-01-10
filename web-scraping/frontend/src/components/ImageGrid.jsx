const ImageGrid = ({ images }) => {
  if (!images.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No images found
      </p>
    )
  }

  const downloadImage = (url) => {
    const a = document.createElement("a")
    a.href = url
    a.download = "image"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {images.map((img, index) => (
        <div
          key={index}
          className="border rounded-lg overflow-hidden"
        >
          <img
            src={img}
            alt="scraped"
            className="w-full h-40 object-cover"
          />

          <button
            onClick={() => downloadImage(img)}
            className="w-full text-sm py-2 bg-black text-white hover:bg-gray-800"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  )
}

export default ImageGrid
