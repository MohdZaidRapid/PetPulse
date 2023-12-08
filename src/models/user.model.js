import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // URL or file reference for the profile picture
  adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "VirtualPet" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign(
      { id: this._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    return token;
  } catch (error) {
    throw new ApiError(404, "above details is not good");
  }
};

export const User = mongoose.model("User", userSchema);
