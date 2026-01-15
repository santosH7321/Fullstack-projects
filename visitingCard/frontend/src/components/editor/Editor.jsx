import { useRef, useState } from "react"
import Toolbar from "./Toolbar"
import Canvas from "./Canvas"
import html2canvas from "html2canvas"

export default function Editor() {
  const canvasRef = useRef(null)

  const [card, setCard] = useState({
    background: null,
    elements: []
  })

  const addText = (type) => {
    setCard(prev => ({
      ...prev,
      elements: [
        ...prev.elements,
        {
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
      ]
    }))
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

  const download = async () => {
    const canvas = await html2canvas(canvasRef.current, { scale: 3 })
    const link = document.createElement("a")
    link.download = "visiting-card.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-4 gap-6">
        <Toolbar addText={addText} addImage={addImage} download={download} />
        <Canvas
          ref={canvasRef}
          card={card}
          updatePosition={updateElementPosition}
        />
      </div>
    </div>
  )
}
