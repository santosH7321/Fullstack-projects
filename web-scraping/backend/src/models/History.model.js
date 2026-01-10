import mongoose from "mongoose"

const historySchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("History", historySchema)
