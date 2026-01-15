import { forwardRef } from "react"
import DraggableItem from "./DraggableItem"

const Canvas = forwardRef(({ card, updatePosition }, ref) => {
  return (
    <div
      ref={ref}
      className="col-span-3 relative bg-gray-300 rounded-lg h-65 overflow-hidden"
    >
      {card.background && (
        <img
          src={card.background}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {card.elements.map(el => (
        <DraggableItem
          key={el.id}
          element={el}
          updatePosition={updatePosition}
        />
      ))}
    </div>
  )
})

export default Canvas
