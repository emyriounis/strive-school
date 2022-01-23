import mongoose from "mongoose";

const { Schema, model } = mongoose;

const LikesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  {
    timestamps: true,
  }
);

export default model("like", LikesSchema);
