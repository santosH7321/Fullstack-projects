import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    coverImage: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model("Book", bookSchema)
