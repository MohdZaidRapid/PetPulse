import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL or file reference for the profile picture
  adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "VirtualPet" }],
});

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
