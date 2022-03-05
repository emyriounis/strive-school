import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserDocument, UserModel, UserType } from "../../types/types";

const { Schema, model } = mongoose;

const userSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    avatar: { type: String },
    birthday: { type: Date },
    posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
    refreshToken: { type: String },
    googleId: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const newUser = this;
  const plainPW = newUser.password;

  if (newUser.isModified("password")) {
    const hash = await bcrypt.hash(plainPW!, 10);
    newUser.password = hash;
  }

  next();
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

userSchema.statics.checkCredentials = async function (email, plainPW) {
  const user = await this.findOne({ email });

  if (user) {
    console.log(plainPW, user);

    const isMatch = await bcrypt.compare(plainPW, user.password);
    console.log(isMatch);

    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

export default model<UserDocument, UserModel>("User", userSchema);
