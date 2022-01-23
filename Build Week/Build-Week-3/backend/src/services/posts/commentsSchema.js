import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CommentsSchema = new Schema(
  {
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

export default model("comment", CommentsSchema);
