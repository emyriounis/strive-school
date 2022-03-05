import mongoose from "mongoose";

const { Schema, model } = mongoose;

const commentsSchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const blogPostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: { type: Number, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    content: { type: String, required: true },
    comments: {
      default: [],
      type: [commentsSchema],
    },
  },
  {
    timestamps: true,
  }
);

export default model("BlogPost", blogPostSchema);
