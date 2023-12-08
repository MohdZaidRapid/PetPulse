// adoptedPet.model.js

import mongoose from "mongoose";

const adoptedPetSchema = new mongoose.Schema({
  virtualPet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VirtualPet",
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adoptionDate: { type: Date, default: Date.now },
});

export const AdoptedPet = mongoose.model("AdoptedPet", adoptedPetSchema);
