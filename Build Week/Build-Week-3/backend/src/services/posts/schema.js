import mongoose from "mongoose";

const { Schema, model } = mongoose;

const PostsSchema = new Schema(
  {
    text: { type: String, required: true },
    image: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
  },
  {
    timestamps: true,
  }
);

// PostsSchema.virtual('profile', {
//     ref: 'Profile',
//     localField: "username",
//     foreignField: "profile",
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
// })

export default model("post", PostsSchema);
