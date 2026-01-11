import mongoose from "mongoose"

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true
        },
        qty: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      default: "pending"
    },
    orderStatus: {
      type: String,
      default: "placed"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Order", orderSchema)
