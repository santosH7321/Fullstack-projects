const ImageGrid = ({ images }) => {
  if (!images.length) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No images found
      </p>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {images.map((img, index) => (
        <a
          key={index}
          href={img}
          target="_blank"
          rel="noreferrer"
          className="border rounded-lg overflow-hidden hover:scale-105 transition"
        >
          <img
            src={img}
            alt="scraped"
            className="w-full h-40 object-cover"
          />
        </a>
      ))}
    </div>
  )
}

export default ImageGrid
