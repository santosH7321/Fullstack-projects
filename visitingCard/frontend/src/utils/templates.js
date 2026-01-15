export const templates = [
  {
    id: "classic",
    background: null,
    elements: [
      {
        id: crypto.randomUUID(),
        type: "text",
        x: 30,
        y: 40,
        content: "Santosh Kumar",
        style: {
          fontSize: "28px",
          color: "#ffffff",
          fontWeight: "700"
        }
      },
      {
        id: crypto.randomUUID(),
        type: "text",
        x: 30,
        y: 80,
        content: "Frontend Developer",
        style: {
          fontSize: "18px",
          color: "#e5e7eb",
          fontWeight: "500"
        }
      }
    ]
  },

  {
    id: "dark",
    background: null,
    elements: [
      {
        id: crypto.randomUUID(),
        type: "text",
        x: 40,
        y: 60,
        content: "Your Name",
        style: {
          fontSize: "30px",
          color: "#000000",
          fontWeight: "700"
        }
      }
    ]
  }
]
