const mongoose = require("mongoose");

const virtualPetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  breed: { type: String },
  age: { type: Number },
  description: { type: String },
  happiness: { type: Number, default: 50, min: 0, max: 100 }, // Scale of 0 to 100
  health: { type: Number, default: 50, min: 0, max: 100 }, // Scale of 0 to 100
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // Additional fields specific to virtual pets can be added here.
});

export const VirtualPet = mongoose.model("VirtualPet", virtualPetSchema);

// module.exports = VirtualPet;
