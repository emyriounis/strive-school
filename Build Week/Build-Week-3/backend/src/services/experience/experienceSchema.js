import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    area: { type: String, required: true },
    username: { type: String, required: true },
    image: {
      type: String,
      required: true,
      default: "http://placeimg.com/640/480",
    },
  },
  { timestamps: true }
);

export default model("Experience", ExperienceSchema);
