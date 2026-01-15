export default function DraggableItem({ element, updatePosition }) {
  const onDragEnd = (e) => {
    const parent = e.target.parentElement.getBoundingClientRect()
    updatePosition(
      element.id,
      e.clientX - parent.left,
      e.clientY - parent.top
    )
  }

  return (
    <div
      draggable
      onDragEnd={onDragEnd}
      style={{
        left: element.x,
        top: element.y,
        ...element.style
      }}
      className="absolute cursor-move select-none"
    >
      {element.type === "text" && element.content}
    </div>
  )
}
