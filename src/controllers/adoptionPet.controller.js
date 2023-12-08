import { AdoptedPet } from "../models/adoptedPet.model.js";
import { AdoptionApplication } from "../models/adoptionApplication.model.js";
import { VirtualPet } from "../models/virtualPet.model.js";

const adoptPet = async (req, res) => {
  try {
    const { virtualPetId } = req.body;

    // Check if the virtual pet is available for adoption
    const virtualPet = await VirtualPet.findById(virtualPetId);

    if (!virtualPet || virtualPet.owner) {
      return res
        .status(404)
        .json({ error: "Virtual pet not found or already adopted." });
    }

    // Check if the adoption application is approved
    const adoptionApplication = await AdoptionApplication.findOne({
      user: req.user._id,
      virtualPet: virtualPetId,
      status: "approved",
    });

    if (!adoptionApplication) {
      return res.status(403).json({
        error: "Adoption application not approved. Cannot adopt the pet.",
      });
    }

    // Create an adopted pet record
    const adoptedPet = await AdoptedPet.create({
      virtualPet: virtualPetId,
      owner: req.user._id, // Assuming you have user authentication middleware
    });

    // Update the virtual pet's owner
    virtualPet.owner = req.user._id;
    await virtualPet.save();

    // Remove the adoption application (assuming it's approved)
    await AdoptionApplication.findOneAndRemove({
      user: req.user._id,
      virtualPet: virtualPetId,
    });

    res.status(201).json({ message: "Pet adopted successfully", adoptedPet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { adoptPet };
