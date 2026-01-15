import { Image, Download, Type } from "lucide-react"

export default function Toolbar({
  addText,
  addImage,
  download,
  activeElement,
  updateStyle,
  applyTemplate
}) {
  return (
    <div className="col-span-1 bg-white rounded-lg shadow p-4 space-y-6">
      <div>
        <h3 className="font-semibold text-sm mb-2">Templates</h3>

        <button
          onClick={() => applyTemplate("classic")}
          className="w-full border rounded p-2 mb-2 hover:bg-gray-100"
        >
          Classic
        </button>

        <button
          onClick={() => applyTemplate("dark")}
          className="w-full border rounded p-2 hover:bg-gray-100"
        >
          Dark
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2">Add Elements</h3>

        <button
          onClick={() => addText("title")}
          className="w-full border rounded p-2 mb-2 flex items-center justify-center gap-2"
        >
          <Type size={16} />
          Add Title
        </button>

        <button
          onClick={() => addText("subtitle")}
          className="w-full border rounded p-2 flex items-center justify-center gap-2"
        >
          <Type size={16} />
          Add Subtitle
        </button>

        <label className="w-full border rounded p-2 mt-2 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-100">
          <Image size={16} />
          Add Background
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => addImage(e.target.files[0])}
          />
        </label>
      </div>

      {activeElement && (
        <div>
          <h3 className="font-semibold text-sm mb-2">Text Style</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm">Color</span>
            <input
              type="color"
              value={activeElement.style.color}
              onChange={(e) => updateStyle("color", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="text-sm">Font Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={parseInt(activeElement.style.fontSize)}
              onChange={(e) =>
                updateStyle("fontSize", `${e.target.value}px`)
              }
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm">Font Weight</label>
            <select
              value={activeElement.style.fontWeight}
              onChange={(e) =>
                updateStyle("fontWeight", e.target.value)
              }
              className="w-full border rounded p-2 mt-1"
            >
              <option value="400">Normal</option>
              <option value="600">Semi Bold</option>
              <option value="700">Bold</option>
            </select>
          </div>
        </div>
      )}

      <button
        onClick={download}
        className="w-full bg-blue-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-blue-700"
      >
        <Download size={18} />
        Download
      </button>

    </div>
  )
}
