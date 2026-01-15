import { forwardRef } from "react"
import DraggableItem from "./DraggableItem"

const Canvas = forwardRef(
  (
    {
      card,
      updatePosition,
      activeElementId,
      setActiveElementId
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={() => setActiveElementId(null)}
        className="col-span-3 relative bg-gray-300 rounded-lg h-[260px] overflow-hidden"
      >
        {card.background && (
          <img
            src={card.background}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        {card.elements.map(el => (
          <DraggableItem
            key={el.id}
            element={el}
            updatePosition={updatePosition}
            setActive={setActiveElementId}
            isActive={activeElementId === el.id}
          />
        ))}
      </div>
    )
  }
)

export default Canvas
