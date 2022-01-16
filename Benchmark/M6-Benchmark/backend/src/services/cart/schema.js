import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("Cart", cartSchema);
