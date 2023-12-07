import mongoose from "mongoose";

const adoptionApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  virtualPet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VirtualPet",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  // Additional fields for application details (e.g., reason for adoption, date submitted, etc.).
});

export const AdoptionApplication = mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);
