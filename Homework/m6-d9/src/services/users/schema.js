import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    birthday: { type: Date, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
