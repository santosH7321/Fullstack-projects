import mongoose from "mongoose"

const elementSchema = new mongoose.Schema({
  type: String,
  x: Number,
  y: Number,
  content: String,
  style: Object
})

const cardSchema = new mongoose.Schema(
  {
    userId: {
      type: String, 
      required: false
    },
    background: String,
    elements: [elementSchema]
  },
  { timestamps: true }
)

export default mongoose.model("Card", cardSchema)
