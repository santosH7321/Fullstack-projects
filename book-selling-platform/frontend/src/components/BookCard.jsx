import { Link } from "react-router-dom"

export default function BookCard({ book }) {
  return (
    <div
      className="group rounded-xl border bg-white p-4 shadow-sm
                 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={book.coverImage}
          alt={book.title}
          className="h-full w-full object-cover transition
                     group-hover:scale-105"
        />
      </div>

      <div className="space-y-1">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
          {book.title}
        </h3>

        <p className="text-sm text-gray-500">
          {book.author}
        </p>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-lg font-bold text-black">
          ₹{book.discountPrice || book.price}
        </span>

        {book.discountPrice && (
          <span className="text-sm text-gray-400 line-through">
            ₹{book.price}
          </span>
        )}
      </div>

      <Link
        to={`/books/${book._id}`}
        className="mt-4 inline-flex w-full items-center justify-center
                   rounded-lg bg-black px-4 py-2 text-sm font-medium text-white
                   transition hover:bg-gray-900"
      >
        View Details
      </Link>
    </div>
  )
}
