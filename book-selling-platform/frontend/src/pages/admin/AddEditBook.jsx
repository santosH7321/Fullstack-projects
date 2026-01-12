export default function AddEditBook() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Add / Edit Book
      </h2>

      <form className="space-y-4 max-w-md">
        <input className="border p-2 w-full" placeholder="Title" />
        <input className="border p-2 w-full" placeholder="Author" />
        <input className="border p-2 w-full" placeholder="Price" />
        <input className="border p-2 w-full" placeholder="Category" />

        <button className="bg-black text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  )
}
