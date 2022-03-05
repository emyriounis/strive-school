import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { UserDocument, UserModel } from "../types/types";

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  const plainPassword = user.password;

  if (user.isModified("password")) {
    const encryptedPassword = await bcrypt.hash(plainPassword, 10);
    user.password = encryptedPassword;
  }

  next();
});

userSchema.methods.toJSON = function () {
  const userDocument = this;
  const userObject = userDocument.toObject();

  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.createdAt;
  delete userObject.updatedAt;
  delete userObject.__v;

  return userObject;
};

userSchema.statics.authenticate = async function (identifier, plainPassword) {
  const user =
    (await this.findOne({ email: identifier })) ||
    (await this.findOne({ username: identifier }));

  if (user) {
    const isMatch = await bcrypt.compare(plainPassword, user.password);

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
