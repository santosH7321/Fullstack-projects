export default function DraggableItem({
  element,
  updatePosition,
  setActive,
  isActive
}) {
  const handleDragEnd = (e) => {
    const parentRect = e.target.parentElement.getBoundingClientRect()

    const x = Math.max(0, e.clientX - parentRect.left)
    const y = Math.max(0, e.clientY - parentRect.top)

    updatePosition(element.id, x, y)
  }

  return (
    <div
      draggable
      onClick={() => setActive(element.id)}
      onDragEnd={handleDragEnd}
      style={{
        left: element.x,
        top: element.y,
        ...element.style,
        outline: isActive ? "2px dashed #3b82f6" : "none"
      }}
      className="absolute cursor-move select-none"
    >
      {element.type === "text" && element.content}
    </div>
  )
}
