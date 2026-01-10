const Loader = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-40 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  )
}

export default Loader
