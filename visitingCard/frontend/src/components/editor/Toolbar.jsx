import { Image, Download } from "lucide-react"

export default function Toolbar({ addText, addImage, download }) {
  return (
    <div className="col-span-1 bg-white rounded-lg shadow p-4 space-y-4">
      <button
        onClick={() => addText("title")}
        className="w-full border p-3 rounded font-semibold"
      >
        Add Title
      </button>

      <button
        onClick={() => addText("subtitle")}
        className="w-full border p-3 rounded"
      >
        Add Subtitle
      </button>

      <label className="block border p-3 rounded cursor-pointer text-center">
        <Image className="inline-block mr-2" />
        Add Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => addImage(e.target.files[0])}
        />
      </label>

      <button
        onClick={download}
        className="w-full bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2"
      >
        <Download size={18} />
        Download
      </button>
    </div>
  )
}
