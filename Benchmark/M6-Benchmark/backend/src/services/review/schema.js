import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rate: { type: String, min: 0, max: 5, required: true },
    productID: [
      { type: Schema.Types.ObjectId, ref: "Product", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Review", reviewSchema);
