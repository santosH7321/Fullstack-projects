import { useRef, useState } from "react"
import html2canvas from "html2canvas"

import Toolbar from "./Toolbar"
import Canvas from "./Canvas"
import { templates } from "../../utils/templates"
import api from "../../services/api"

export default function Editor() {
  const canvasRef = useRef(null)

  const [card, setCard] = useState({
    background: null,
    elements: []
  })

  const [activeElementId, setActiveElementId] = useState(null)

  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) 


  const showToast = (type, message) => {
    setToast({ type, message })
    setTimeout(() => setToast(null), 3000)
  }

  const addText = (type) => {
    const newElement = {
      id: crypto.randomUUID(),
      type: "text",
      x: 40,
      y: 40,
      content: type === "title" ? "Title Text" : "Subtitle Text",
      style: {
        fontSize: type === "title" ? "32px" : "20px",
        color: "#ffffff",
        fontWeight: "600"
      }
    }

    setCard(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }))

    setActiveElementId(newElement.id)
  }

  const addImage = (file) => {
    const url = URL.createObjectURL(file)
    setCard(prev => ({
      ...prev,
      background: url
    }))
  }

  const updateElementPosition = (id, x, y) => {
    setCard(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === id ? { ...el, x, y } : el
      )
    }))
  }


  const activeElement = card.elements.find(
    el => el.id === activeElementId
  )


  const updateStyle = (key, value) => {
    if (!activeElementId) return

    setCard(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === activeElementId
          ? {
              ...el,
              style: { ...el.style, [key]: value }
            }
          : el
      )
    }))
  }

  const applyTemplate = (templateId) => {
    const template = templates.find(t => t.id === templateId)
    if (!template) return

    setCard({
      background: template.background,
      elements: template.elements
    })

    setActiveElementId(null)
  }


  const download = async () => {
    if (!canvasRef.current) return

    try {
      setLoading(true)

      const canvas = await html2canvas(canvasRef.current, {
        scale: 3,
        useCORS: true
      })

      const link = document.createElement("a")
      link.download = "visiting-card.png"
      link.href = canvas.toDataURL("image/png")
      link.click()

      showToast("success", "Card downloaded successfully")
    } catch (err) {
      showToast("error", "Download failed")
    } finally {
      setLoading(false)
    }
  }


  const saveCard = async () => {
    if (card.elements.length === 0) return

    try {
      setLoading(true)
      const res = await api.post("/cards", card)
      showToast("success", "Card saved successfully")
      console.log("Saved card:", res.data)
    } catch (error) {
      console.error(error)
      showToast("error", "Failed to save card")
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      {toast && (
        <div
          className={`fixed top-6 right-6 px-4 py-3 rounded shadow text-white
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
        <Toolbar
          addText={addText}
          addImage={addImage}
          download={download}
          activeElement={activeElement}
          updateStyle={updateStyle}
          applyTemplate={applyTemplate}
          saveCard={saveCard}
          disableSave={card.elements.length === 0 || loading}
        />

        <Canvas
          ref={canvasRef}
          card={card}
          updatePosition={updateElementPosition}
          activeElementId={activeElementId}
          setActiveElementId={setActiveElementId}
        />
      </div>
    </div>
  )
}
