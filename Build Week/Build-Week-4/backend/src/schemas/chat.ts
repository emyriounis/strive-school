import { Schema, model } from "mongoose";
import { ChatDocument, ChatModel } from "../types/types";

const chatSchema = new Schema<ChatDocument>(
  {
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: {
          text: { type: String },
          media: { type: String },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

chatSchema.methods.toJSON = function () {
  const chatDocument = this;
  const chatObject = chatDocument.toObject();

  delete chatObject.createdAt;
  // delete chatObject.updatedAt;
  delete chatObject.__v;

  return chatObject;
};

export default model<ChatDocument, ChatModel>("Chat", chatSchema);
