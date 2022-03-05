import mongoose from "mongoose";
import { PostDocument, PostModel, CommentDocument } from "../../types/types";

const { Schema, model } = mongoose;

const commentsSchema = new Schema<CommentDocument>(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const blogPostSchema = new Schema<PostDocument>(
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

export default model<PostDocument, PostModel>("BlogPost", blogPostSchema);
