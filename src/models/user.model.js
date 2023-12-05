import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String }, // URL or file reference for the profile picture
  adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "VirtualPet" }],
});

export const User = mongoose.model("User", userSchema);
