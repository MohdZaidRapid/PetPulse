// const AdoptionApplication = require("../models/adoptionApplication.model");
import { AdoptionApplication } from "../models/adoptionApplication.model.js";

// Controller to submit adoption applications
const submitAdoptionApplication = async (req, res) => {
  try {
    const user = req.user._id;
    const { virtualPet } = req.body;

    // Check if the user has already submitted an application for the same pet
    const existingApplication = await AdoptionApplication.findOne({
      user,
      virtualPet,
    });

    if (existingApplication) {
      return res.status(400).json({
        error: "You have already submitted an application for this pet",
      });
    }

    const application = await AdoptionApplication.create({ user, virtualPet });

    res.status(201).json({
      application,
      message: "Adoption application submitted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { submitAdoptionApplication };
